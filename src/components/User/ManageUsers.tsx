import {
  ChangeEvent,
  SyntheticEvent,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  Typography,
  Autocomplete,
  TextField,
  Dialog,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  SelectChangeEvent,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { FieldPath, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  UserType,
  useCreateUser,
  useUpdateUser,
  useQueryUsers,
  useAuthorizedSubmit,
  CreateUserPayload,
  useDeleteUser,
  IUserBrief,
  CorpsDataType,
  CorpsType,
} from "../../api";
import {
  corpsOptions,
  defaultUserData,
  inputLabelStyles,
} from "../../constants";

import {
  dialogActionsStyles,
  dialogContentStyles,
  dialogButtonStyles,
  openButtonStyles,
  dialogTitleStyles,
  dialogInputsWrapperStyles,
} from "./styles";
import { OpenUserType, ManageUserMode } from "./types";
import { manageUserSchema } from "./schemas";
import { Input } from "../../shared";

type CorpsOptionType = {
  label: CorpsDataType;
  group: CorpsType;
} | null;

export const ManageUsers: OpenUserType = ({ mode, onClose }) => {
  const [user, setUser] = useState<IUserBrief>();
  const [selectValue, setSelectValue] = useState<string | null>(null);
  const [corpsValue, setCorpsValue] = useState<CorpsOptionType>(null);

  const { formState, watch, register, setValue, reset, trigger, clearErrors } =
    useForm<IUserBrief>({
      defaultValues: defaultUserData,
      values: user,
      resolver: yupResolver(manageUserSchema),
    });

  const { role, user: userName, corps } = watch();

  const { users } = useQueryUsers(userName, {
    enabled: mode === ManageUserMode.UPDATE,
  });

  const { mutate: createUser } = useCreateUser({
    onSuccess: (res) => {
      const password = (res as { password: string })?.password;
      if (password) {
        alert(
          `Дані про нового користувача: Логін: ${userName}, Пароль: ${password}`
        );
      }
    },
  });
  const createUserWithAuthorization = useAuthorizedSubmit(
    createUser as (data: CreateUserPayload) => void,
    [{ user: userName ?? "", role }]
  );

  const { mutate: updateUser } = useUpdateUser();
  const handleUpdateUser = useCallback(() => {
    if (!user) {
      return;
    }
    updateUser(user as IUserBrief);
  }, [updateUser, user]);
  const updateUserWithAuthorization = useAuthorizedSubmit(handleUpdateUser);

  const { mutate: deleteUser } = useDeleteUser();
  const handleDeleteUser = useCallback(() => {
    if (!user) {
      return;
    }
    deleteUser(user.id);
  }, [deleteUser, user]);
  const deleteUserWithAuthorization = useAuthorizedSubmit(handleDeleteUser);

  const convertedUsers = useMemo(
    () =>
      users.reduce(
        (
          acc: Record<string, string>,
          { fullName, id, user, position, militaryBase }
        ) => {
          acc[id] = `Логін: ${user}`;
          if (fullName) {
            acc[id] += `, ПІБ: ${fullName}`;
          }
          if (position) {
            acc[id] += `, Посада: ${position}`;
          }
          if (militaryBase) {
            acc[id] += `, В/ч: ${militaryBase}`;
          }
          return acc;
        },
        {}
      ),
    [users]
  );

  const handleRoleChange = useCallback(
    (event: SelectChangeEvent<UserType>) => {
      clearErrors();
      setValue("role", event.target.value as UserType);
    },
    [clearErrors, setValue]
  );

  const handleUserChange = useCallback(
    (_event: SyntheticEvent<Element, Event>, v: string | null) => {
      clearErrors();
      setSelectValue(v);
      if (!v) {
        return;
      }
      const selectedUser = users.find(({ id }) => convertedUsers[id] === v);
      if (selectedUser) {
        setUser(selectedUser);
      }
    },
    [clearErrors, convertedUsers, users]
  );

  const handleCorpsChange = useCallback(
    (_event: SyntheticEvent<Element, Event>, v: CorpsOptionType) => {
      setCorpsValue(v);
      if (!v) {
        return;
      }
      setValue("corps", v.label);
      clearErrors("corps");
    },
    [setValue, clearErrors]
  );

  const handleInputChange =
    (field: FieldPath<IUserBrief>) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(field, event.target.value);
      clearErrors(field);
    };

  const handleSubmit = async () => {
    const isValid = await trigger();
    if (!isValid) {
      return;
    }
    if (mode === ManageUserMode.CREATE) {
      createUserWithAuthorization();
    }
    if (mode === ManageUserMode.UPDATE) {
      updateUserWithAuthorization();
    }
    if (mode === ManageUserMode.REMOVE) {
      deleteUserWithAuthorization();
    }
    onClose();
  };

  const handleReset = () => {
    reset();
  };

  const isCorpsDoctor = role === UserType.CORPS;
  const isMilitaryBaseDoctor = role === UserType.MILITARY_BASE;
  const isSubdivisionDoctor = role === UserType.SUBDIVISION;

  const hasDivision =
    isCorpsDoctor || isMilitaryBaseDoctor || isSubdivisionDoctor;

  const {
    corps: corpsError,
    militaryBase: militaryBaseError,
    subdivision: subdivisionError,
    user: loginError,
  } = formState.errors;

  return (
    <Dialog open={true} fullWidth={true} maxWidth="lg" onClose={onClose}>
      <DialogContent sx={dialogContentStyles}>
        <Box sx={dialogTitleStyles}>
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            {`${
              mode === ManageUserMode.CREATE ? "Додати" : "Обрати"
            } користувача`}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={dialogInputsWrapperStyles}>
          <FormControl>
            <InputLabel sx={inputLabelStyles}>
              Оберіть рівень доступу
            </InputLabel>
            <Select
              value={role}
              disabled={mode === ManageUserMode.REMOVE}
              {...register("role")}
              onChange={handleRoleChange}
            >
              {Object.values(UserType).map((type) => (
                <MenuItem value={type} key={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {hasDivision &&
            (isCorpsDoctor ? (
              <FormControl>
                <Autocomplete
                  value={corpsValue}
                  renderInput={(params) => (
                    <Input
                      {...params}
                      error={corpsError?.message}
                      label="Рід військ"
                      value={corps}
                      variant="outlined"
                    />
                  )}
                  options={corpsOptions}
                  groupBy={(o) => o.group}
                  onChange={handleCorpsChange}
                />
              </FormControl>
            ) : (
              <>
                {isSubdivisionDoctor && (
                  <Input
                    label="Батальйон"
                    {...register("subdivision")}
                    onChange={handleInputChange("subdivision")}
                    error={subdivisionError?.message}
                    fullWidth={true}
                    variant="outlined"
                  />
                )}
                <Input
                  label="Військова частина"
                  {...register("militaryBase")}
                  onChange={handleInputChange("militaryBase")}
                  error={militaryBaseError?.message}
                  fullWidth={true}
                  variant="outlined"
                />
              </>
            ))}
          {mode !== ManageUserMode.CREATE ? (
            <Autocomplete
              value={selectValue}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Почніть вводити логін користувача"
                  onChange={handleInputChange("fullName")}
                />
              )}
              options={Object.values(convertedUsers)}
              noOptionsText="Збігів не знайдено"
              onChange={handleUserChange}
            />
          ) : (
            <Input
              label="Логін"
              value={userName}
              error={loginError?.message}
              variant="outlined"
              fullWidth={true}
              onChange={handleInputChange("user")}
            />
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={dialogActionsStyles}>
        <Button
          variant="contained"
          size="large"
          sx={openButtonStyles}
          onClick={handleReset}
        >
          Очистити
        </Button>
        <Button
          variant="contained"
          sx={dialogButtonStyles}
          size="large"
          color={mode === ManageUserMode.REMOVE ? "error" : "primary"}
          onClick={handleSubmit}
        >
          Підтвердити
        </Button>
      </DialogActions>
    </Dialog>
  );
};

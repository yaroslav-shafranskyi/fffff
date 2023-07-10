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
  SelectChangeEvent,
  FormControl,
  InputLabel,
} from "@mui/material";

import {
  UserType,
  useCreateUser,
  useUpdateUser,
  useQueryUsers,
  useAuthorizedSubmit,
  CreateUserPayload,
  useDeleteUser,
  IUserBrief,
} from "../../api";

import {
  dialogActionsStyles,
  dialogContentStyles,
  dialogButtonStyles,
  openButtonStyles,
  dialogInputsWrapperStyles,
} from "./styles";
import { OpenUserType, ManageUserMode } from "./types";

export const ManageUsers: OpenUserType = ({ mode, onClose }) => {
  const [userName, setUserName] = useState<string>("");
  const [userId, setUserId] = useState<string>();
  const [value, setValue] = useState<string | null>(null);
  const [role, setRole] = useState<UserType>("" as UserType);

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
    [{ user: userName, role }]
  );

  const { mutate: updateUser } = useUpdateUser();
  const handleUpdateUser = useCallback(() => {
    if (userId === undefined) {
      return;
    }
    updateUser({ id: +userId, role } as IUserBrief);
  }, [role, updateUser, userId]);
  const updateUserWithAuthorization = useAuthorizedSubmit(handleUpdateUser);

  const { mutate: deleteUser } = useDeleteUser();
  const handleDeleteUser = useCallback(() => {
    if (userId === undefined) {
      return;
    }
    deleteUser(+userId);
  }, [deleteUser, userId]);
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

  const handleUserChange = useCallback(
    (_event: SyntheticEvent<Element, Event>, value: string | null) => {
      setValue(value);
      if (!value) {
        return;
      }
      const { id, role: newRole } =
        users.find(({ id }) => convertedUsers[id] === value) ?? {};
      if (id !== undefined) {
        setUserId(String(id));
      }
      if (newRole) {
        setRole(newRole);
      }
    },
    [convertedUsers, users]
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleRoleChange = (event: SelectChangeEvent<UserType>) => {
    setRole(event.target.value as UserType);
  };

  const handleSubmit = () => {
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

  return (
    <Dialog open={true} fullWidth={true} maxWidth="lg" onClose={onClose}>
      <DialogContent sx={dialogContentStyles}>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          {mode === ManageUserMode.CREATE
            ? "Введіть дані нового користувача"
            : "Виберіть користувача"}
        </Typography>
        <Box sx={dialogInputsWrapperStyles}>
          {mode !== ManageUserMode.CREATE ? (
            <Autocomplete
              value={value}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Почніть вводити логін"
                  onChange={handleInputChange}
                />
              )}
              options={Object.values(convertedUsers)}
              noOptionsText="Збігів не знайдено"
              onChange={handleUserChange}
            />
          ) : (
            <TextField
              label="Логін"
              value={userName}
              onChange={handleInputChange}
            />
          )}
          <FormControl>
            <InputLabel>Рівень доступу</InputLabel>
            <Select
              value={role}
              disabled={mode === ManageUserMode.REMOVE}
              label="Рівень доступу"
              onChange={handleRoleChange}
            >
              {Object.values(UserType).map((type) => (
                <MenuItem value={type} key={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions sx={dialogActionsStyles}>
        <Button
          variant="contained"
          size="large"
          sx={openButtonStyles}
          onClick={onClose}
        >
          Відмінити
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

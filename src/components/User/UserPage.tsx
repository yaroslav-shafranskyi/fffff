import { useCallback } from "react";
import {
  Typography,
  Box,
  InputLabel,
  Container,
  TextField,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import { useForm } from "react-hook-form";

import {
  ArmyRank,
  IUserBrief,
  useAuthorizedSubmit,
  useGetUser,
  useUpdateUser,
} from "../../api";
import { ControlBar, Signature } from "../../shared";
import { defaultUserData } from "../../constants";

import { containerStyles, infoRowStyles, infoWrapperStyles } from "./styles";
import { RecordsTable } from "./RecordsTable";

export const UserPage = () => {
  const user = useGetUser();

  const { mutate: updateUser } = useUpdateUser();

  const { register, handleSubmit, reset, watch, setValue } =
    useForm<IUserBrief>({
      defaultValues: defaultUserData,
      values: user,
    });

  const handleUpdateSignature = useCallback(
    (sig?: string) => {
      setValue("signature", sig);
    },
    [setValue]
  );

  return (
    <Container maxWidth={false} sx={containerStyles}>
      <ControlBar
        title="Налаштування"
        onClear={reset}
        onSubmit={useAuthorizedSubmit(
          handleSubmit(updateUser as (nUser: IUserBrief) => void)
        )}
      />
      <Typography variant="h5">Особиста інформація</Typography>
      <Box sx={infoWrapperStyles}>
        <Box sx={infoRowStyles}>
          <TextField label="ПІБ" {...register("fullName")} />
          <FormControl>
            <InputLabel sx={{ bgcolor: "background.paper", px: 0.5 }}>
              Звання
            </InputLabel>
            <Select {...register("rank")} value={watch("rank") ?? ''}>
              {Object.values(ArmyRank).map((r) => (
                <MenuItem value={r} key={r}>
                  {r}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField label="Посада" {...register("position")} />
        </Box>
        <Box sx={infoRowStyles}>
          <TextField label="Мед. установа" {...register("clinic")} />
          <TextField label="Військова частина" {...register("militaryBase")} />
          <TextField label="Підрозділ" {...register("subdivision")} />
        </Box>
        <Box sx={infoRowStyles}>
          <TextField label="Телефон" {...register("phone")} />
          <TextField label="Пошта" {...register("email")} />
          <Signature
            withHint={true}
            variant="outlined"
            signature={watch("signature")}
            onSubmit={handleUpdateSignature}
          />
        </Box>
      </Box>
      <Box sx={{ mt: 1 }}>
        <RecordsTable />
      </Box>
    </Container>
  );
};

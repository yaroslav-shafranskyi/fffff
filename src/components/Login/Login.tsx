import { ChangeEvent, KeyboardEvent, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import { clearButtonStyles, loginUrl } from "../../constants";
import {
  IAuthorizationRequest,
  IAuthorizationResponse,
  UserType,
  useLogin,
} from "../../api";
import { validateUUID } from "../../helpers";

import { actionsStyles, inputsWrapperStyles, wrapperStyles } from "./styles";

const errorText = "Неправильний логін або пароль!";

export const Login = () => {
  const navigate = useNavigate();

  const { state } = useLocation();
  const prevPath = state?.prevPath as string;

  const [error, setError] = useState<string>();

  const { register, reset, handleSubmit, setValue } =
    useForm<IAuthorizationRequest>({
      defaultValues: {
        user: "",
        password: "",
      },
    });

  const { mutate: login } = useLogin({
    onSuccess: (res) => {
      const { role } = res as IAuthorizationResponse;
      if (role === UserType.NONE) {
        setError(errorText);
        return;
      }

      const url = !!prevPath && prevPath !== loginUrl ? prevPath : "/";
      navigate(url);
    },
  });

  const handleInputChange =
    (key: "user" | "password") => (event: ChangeEvent<HTMLInputElement>) => {
      setValue(key, event.target.value);
      setError(undefined);
    };

  const handleReset = useCallback(() => {
    reset();
  }, [reset]);

  const submit = handleSubmit((data: IAuthorizationRequest) => {
    const isPasswordValid = validateUUID(data.password);
    if (!isPasswordValid) {
      setError(errorText);
      return;
    }
    login(data);
  });

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        submit();
      }
    },
    [submit]
  );

  return (
    <Box sx={wrapperStyles}>
      <Typography variant="h5">Ласкаво просимо до додатку</Typography>
      <Typography>Введіть, будь ласка, логін і пароль</Typography>
      <Box sx={inputsWrapperStyles}>
        <TextField
          label="Логін"
          {...register("user")}
          onChange={handleInputChange("user")}
          error={!!error}
        />
        <TextField
          label="Пароль"
          {...register("password")}
          type="password"
          onChange={handleInputChange("password")}
          onKeyUp={handleKeyUp}
          error={!!error}
        />
      </Box>
      <Box sx={actionsStyles}>
        <Button
          fullWidth={true}
          variant="contained"
          sx={clearButtonStyles}
          onClick={handleReset}
        >
          Очистити
        </Button>
        <Button fullWidth={true} variant="contained" onClick={submit}>
          Прийняти
        </Button>
      </Box>
      {!!error && <Typography color="error">{error}</Typography>}
    </Box>
  );
};

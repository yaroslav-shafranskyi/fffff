import { ChangeEvent, useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FieldPath, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Container, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";

import {
  IReferral,
  useGetReferral,
  useCreateReferral,
  useAuthorizedSubmit,
} from "../../api";
import { defaultReferralData, referralUrl } from "../../constants";
import {
  ControlBar,
  Input,
  DateInputWithTextMonth,
  InputWithTextIndent,
} from "../../shared";
import { Trident } from "../../assets";
import {
  convertNullOrNumberToDate,
  removeQueriesAfterFormSaving,
} from "../../helpers";

import { referralSchema } from "./schemas";
import {
  codeWrapper,
  containerStyles,
  headerInputPropsSx,
  headerStyles,
  inlineInputWrapper,
  mainHeaderWrapper,
  militaryBaseWrapperStyles,
  numberInputPropsSx,
  numberInputStyles,
  numberWrapperStyles,
  patientInputPropsSx,
} from "./styles";

export const Referral = () => {
  const { pathname, state } = useLocation();
  const readonly = state?.readonly as boolean;

  const navigate = useNavigate();

  const [initialPersonId, initialFormId] = useMemo(
    () =>
      (pathname.split(`${referralUrl}/`)[1]?.split("/") ?? []).map(decodeURI),
    [pathname]
  );

  const queryClient = useQueryClient();

  const { referral: initialForm } = useGetReferral(
    initialPersonId,
    initialFormId
  );

  const { mutate: saveForm } = useCreateReferral({
    onSuccess: () => {
      navigate(-1);
      removeQueriesAfterFormSaving(queryClient);
    },
  });

  const {
    formState,
    register,
    getValues,
    setValue,
    clearErrors,
    reset,
    handleSubmit,
  } = useForm<IReferral>({
    defaultValues: defaultReferralData,
    values: initialForm,
    resolver: yupResolver(referralSchema),
  });

  const { errors } = formState;

  const handleInputChange = useCallback(
    (field: FieldPath<IReferral>) => (event: ChangeEvent<HTMLInputElement>) => {
      if (readonly) {
        return;
      }
      setValue(field, event.target.value);
      clearErrors(field);
    },
    [readonly, setValue, clearErrors]
  );

  const handleDateChange = useCallback(
    (date?: Date) => {
      if (!date || readonly) {
        return;
      }
      setValue("date", date.getTime());
      clearErrors("date");
    },
    [readonly, setValue, clearErrors]
  );

  const dateError = errors?.date?.message;

  const submitForm = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ({ id, ...data }: IReferral) => {
      if (readonly) {
        return;
      }

      saveForm(data);

      navigate(-1);
    },
    [navigate, readonly, saveForm]
  );

  return (
    <Container maxWidth={false} sx={containerStyles}>
      <ControlBar
        onClear={reset}
        onSubmit={useAuthorizedSubmit(handleSubmit(submitForm))}
      />
      <Box>
        <Box sx={headerStyles}>
          <Box sx={militaryBaseWrapperStyles}>
            <Trident />
            <Typography>МІНІСТЕРСТВО ОБОРОНИ УКРАЇНИ</Typography>
            <Typography>ВІЙСЬКОВА ЧАСТИНА</Typography>
            <Input
              {...register("militaryBase")}
              value={getValues("militaryBase")}
              fullWidth={true}
              placeholder="Номер в/ч"
              inputProps={{
                sx: headerInputPropsSx,
              }}
              error={errors?.militaryBase?.message}
              onChange={handleInputChange("militaryBase")}
            />
            <Box sx={codeWrapper}>
              <Typography>Код</Typography>
              <Input
                {...register("code")}
                value={getValues("code")}
                error={errors?.code?.message}
                onChange={handleInputChange("code")}
              />
            </Box>
            <Box>
              <DateInputWithTextMonth
                readonly={readonly}
                value={convertNullOrNumberToDate(getValues("date"))}
                onChange={handleDateChange}
              />
              {dateError !== undefined && (
                <Typography color="error">{dateError}</Typography>
              )}
            </Box>
            <Box sx={{ width: "100%" }}>
              <Input
                {...register("militaryBaseAddress")}
                value={getValues("militaryBaseAddress")}
                multiline={true}
                rows={3}
                placeholder="Адреса в/ч"
                fullWidth={true}
                inputProps={{
                  sx: headerInputPropsSx,
                }}
                error={errors?.militaryBaseAddress?.message}
                onChange={handleInputChange("militaryBaseAddress")}
              />
            </Box>
          </Box>
          <Box sx={mainHeaderWrapper}>
            <Box sx={numberWrapperStyles}>
              <Typography sx={{ fontWeight: "bold" }} variant="h5">
                НАПРАВЛЕННЯ №
              </Typography>
              <Input
                {...register("number")}
                value={getValues("number")}
                error={errors?.number?.message}
                sx={numberInputStyles}
                inputProps={{
                  sx: numberInputPropsSx,
                }}
                onChange={handleInputChange("number")}
              />
            </Box>
            <Box sx={inlineInputWrapper}>
              <Typography>Командиру в/ч</Typography>
              <Input
                {...register("receiver")}
                error={errors?.receiver?.message}
                fullWidth={true}
                value={getValues("receiver")}
                onChange={handleInputChange("receiver")}
              />
            </Box>
            <Typography>Направляється на стаціонарне лікування</Typography>
            <Input
              {...register("patient")}
              error={errors?.patient?.message}
              multiline={true}
              rows={2}
              fullWidth={true}
              inputProps={{
                sx: patientInputPropsSx,
              }}
              value={getValues("patient")}
              onChange={handleInputChange("patient")}
            />
          </Box>
        </Box>
        <InputWithTextIndent
          title="ДІАГНОЗ:"
          inputProps={{
            ...register("diagnosis"),
            error: errors?.diagnosis?.message,
            value: getValues("diagnosis"),
            multiline: true,
            rows: 2,
            fullWidth: true,
            onChange: handleInputChange("diagnosis"),
          }}
        />
        <Input
          {...register("commander.position")}
          error={errors?.commander?.position?.message}
          value={getValues("commander.position")}
          fullWidth={true}
          inputProps={{
            sx: {
              fontWeight: "bold",
            },
          }}
          placeholder="Повна назва посади командира в/ч"
          onChange={handleInputChange("commander.position")}
        />
        <Input
          {...register("commander.fullName")}
          error={errors?.commander?.fullName?.message}
          value={getValues("commander.fullName")}
          fullWidth={true}
          inputProps={{
            sx: {
              fontWeight: "bold",
            },
          }}
          placeholder="Звання та ПІБ командира в/ч"
          onChange={handleInputChange("commander.fullName")}
        />
        <Input
          {...register("medicalCommander.position")}
          error={errors?.medicalCommander?.position?.message}
          value={getValues("medicalCommander.position")}
          fullWidth={true}
          inputProps={{
            sx: {
              fontWeight: "bold",
            },
          }}
          placeholder="Повна назва посади начальника мед. служби в/ч"
          onChange={handleInputChange("medicalCommander.position")}
        />
        <Input
          {...register("medicalCommander.fullName")}
          error={errors?.medicalCommander?.fullName?.message}
          value={getValues("medicalCommander.fullName")}
          fullWidth={true}
          inputProps={{
            sx: {
              fontWeight: "bold",
            },
          }}
          placeholder="Звання і ПІБ начальника мед. служби в/ч"
          onChange={handleInputChange("medicalCommander.fullName")}
        />
      </Box>
    </Container>
  );
};

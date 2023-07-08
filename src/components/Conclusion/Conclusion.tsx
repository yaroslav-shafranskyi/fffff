import { ChangeEvent, useCallback, useMemo } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { FieldPath, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";

import { conclusionUrl, defaultConclusion, personsUrl } from "../../constants";
import {
  IConclusion,
  useGetConclusion,
  useCreateConclusion,
  useAuthorizedSubmit,
} from "../../api";
import {
  ControlBar,
  DateInputWithTextMonth,
  Input,
  InputWithTextIndent,
} from "../../shared";
import { convertNullOrNumberToDate } from "../../helpers";

import { FormHeader, MinistryOrder } from "../CommonFormHeader";
import {
  boldTextStyles,
  containerStyles,
  formContentStyles,
  formWrapperStyles,
} from "../commonFormStyles";

import { conclusionSchema } from "./schemas";
import {
  contentWrapperStyles,
  footerStyles,
  mpWrapperStyles,
  signatureInputWrapperStyles,
  signatureStyles,
  signaturesWrapperStyles,
  titleWrapperStyles,
} from "./styles";
import { PersonInfo } from "./PersonInfo";

export const Conclusion = () => {
  const { pathname, state } = useLocation();
  const readonly = state?.readonly;

  const navigate = useNavigate();

  const [personId, formId] = useMemo(
    () =>
      (pathname.split(`${conclusionUrl}/`)[1]?.split("/") ?? []).map(decodeURI),
    [pathname]
  );

  const { conclusion: initialForm } = useGetConclusion(personId, formId);

  const queryClient = useQueryClient();

  const { mutate: saveForm } = useCreateConclusion({
    onSuccess: () => {
      queryClient.removeQueries([personsUrl]);
      navigate(-1);
    },
  });

  const methods = useForm<IConclusion>({
    defaultValues: defaultConclusion,
    values: initialForm,
    resolver: yupResolver(conclusionSchema),
  });

  const {
    formState,
    register,
    getValues,
    setValue,
    reset,
    handleSubmit,
    clearErrors,
  } = methods;
  const errors = formState.errors;

  const handleInputChange = useCallback(
    (field: FieldPath<IConclusion>) =>
      (event: ChangeEvent<HTMLInputElement>) => {
        if (readonly) {
          return;
        }
        setValue(field, event.target.value);
        clearErrors(field);
      },
    [clearErrors, readonly, setValue]
  );

  const handleDateChange = useCallback(
    (date?: Date) => {
      if (readonly || !date) {
        return;
      }
      setValue("date", date.getTime());
      clearErrors("date");
    },
    [clearErrors, readonly, setValue]
  );

  const submitForm = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ({ id, ...data }: IConclusion) => {
      if (!readonly) {
        saveForm(data);
      }
    },
    [readonly, saveForm]
  );

  const dateError = errors?.date?.message;

  return (
    <Container maxWidth={false} sx={containerStyles}>
      <ControlBar
        onClear={reset}
        onSubmit={useAuthorizedSubmit(handleSubmit(submitForm))}
      />
      <Box sx={formWrapperStyles}>
        <MinistryOrder />
        <Box sx={formContentStyles}>
          <FormProvider {...methods}>
            <FormHeader readonly={readonly} formNumber="028/о" />
          </FormProvider>
          <Box sx={titleWrapperStyles}>
            <Typography variant="h5" sx={boldTextStyles}>
              Консультаційний висновок спеціаліста
            </Typography>
          </Box>
          <Box sx={contentWrapperStyles}>
            <InputWithTextIndent
              title="1. Найменування закладу охорони здоров’я, який направив пацієнта на консультацію"
              inputProps={{
                ...register("sender"),
                error: errors?.sender?.message,
                fullWidth: true,
                multiline: true,
                rows: 2,
                value: getValues("sender"),
                onChange: handleInputChange("sender"),
              }}
            />
            <FormProvider {...methods}>
              <PersonInfo readonly={readonly} />
            </FormProvider>
            <InputWithTextIndent
              title="4. Спеціальність, прізвище, ім’я, по батькові лікаря-консультанта"
              inputProps={{
                ...register("doctor"),
                error: errors?.doctor?.message,
                fullWidth: true,
                multiline: true,
                rows: 2,
                value: getValues("doctor"),
                onChange: handleInputChange("doctor"),
              }}
            />
            <InputWithTextIndent
              title="5. Результати лабораторного дослідження"
              inputProps={{
                ...register("labResults"),
                error: errors?.labResults?.message,
                fullWidth: true,
                multiline: true,
                rows: 4,
                value: getValues("labResults"),
                onChange: handleInputChange("labResults"),
              }}
            />
            <InputWithTextIndent
              title="6. Результати функціонального, рентгенологічного та інших спеціальних досліджень: "
              inputProps={{
                ...register("researchResults"),
                error: errors?.researchResults?.message,
                fullWidth: true,
                multiline: true,
                rows: 3,
                value: getValues("researchResults"),
                onChange: handleInputChange("researchResults"),
              }}
            />
            <InputWithTextIndent
              title="7. Висновок спеціаліста (встановлений діагноз)"
              inputProps={{
                ...register("diagnosis"),
                error: errors?.diagnosis?.message,
                fullWidth: true,
                multiline: true,
                rows: 3,
                value: getValues("diagnosis"),
                onChange: handleInputChange("diagnosis"),
              }}
            />
            <InputWithTextIndent
              title="8. Рекомендації:"
              inputProps={{
                ...register("recommendations"),
                error: errors?.recommendations?.message,
                fullWidth: true,
                multiline: true,
                rows: 3,
                value: getValues("recommendations"),
                onChange: handleInputChange("recommendations"),
              }}
            />
            <Box sx={footerStyles}>
              <Box>
                <DateInputWithTextMonth
                  value={convertNullOrNumberToDate(getValues("date"))}
                  onChange={handleDateChange}
                />
                {dateError !== undefined && (
                  <Typography color="error">{dateError}</Typography>
                )}
              </Box>
              <Box sx={mpWrapperStyles}>
                <Typography>М.П.</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={signaturesWrapperStyles}>
            <Box sx={signatureStyles}>
              <Typography>Лікар-консультант</Typography>
              <Box sx={signatureInputWrapperStyles}>
                <Input
                  fullWidth={true}
                  {...register("signature")}
                  onChange={handleInputChange("signature")}
                  value={getValues("signature") ?? ""}
                />
                <Typography sx={{ textAlign: "center" }} variant="caption">
                  (П.І.Б.)(підпис)
                </Typography>
              </Box>
            </Box>
            <Box sx={signatureStyles}>
              <Typography sx={{ maxWidth: "192px" }}>
                Завідувач поліклініки або стаціонарного відділення
              </Typography>
              <Box sx={signatureInputWrapperStyles}>
                <Input
                  {...register("headOfTheClinic")}
                  fullWidth={true}
                  value={getValues("headOfTheClinic")}
                  onChange={handleInputChange("headOfTheClinic")}
                />
                <Typography sx={{ textAlign: "center" }} variant="caption">
                  (П.І.Б.)(підпис)
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

import { useCallback, useMemo, useState } from "react";
import { Container } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";

import { ControlBar } from "../../shared";
import {
  dischargeUrl,
  defaultDischargeBackPageState,
  defaultDischargeFrontPageState,
  defaultPersonData,
  personsUrl,
} from "../../constants";
import { useGetDischarge, useCreateDischarge } from "../../api";

import { containerStyles } from "../commonFormStyles";

import { FrontPage } from "./FrontPage";
import { DischargeBackPageState, DischargeFrontPageState } from "./types";
import { BackPage } from "./BackPage";
import { dischargeBackPageSchema, dischargeFrontPageSchema } from "./schemas";

const { defaultFrontPageValues, defaultBackPageValues } = {
  defaultFrontPageValues: {
    ...defaultDischargeFrontPageState,
    person: defaultPersonData,
  },
  defaultBackPageValues: defaultDischargeBackPageState,
};

export const Discharge = () => {
  const { pathname, state } = useLocation();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const [personId, formId] = useMemo(
    () =>
      (pathname.split(`${dischargeUrl}/`)[1]?.split("/") ?? []).map(decodeURI),
    [pathname]
  );

  const { discharge: initialForm } = useGetDischarge(personId, formId);

  const { mutate: saveForm } = useCreateDischarge({
    onSuccess: () => {
      navigate(-1);
      queryClient.removeQueries([personsUrl]);
    },
  });

  const { initialFrontPageValues, initialBackPageValues } = useMemo(() => {
    const { doctor, date, recommendations, info, ...rest } = initialForm;
    return {
      initialFrontPageValues: { ...rest },
      initialBackPageValues: { doctor, date, recommendations, info },
    };
  }, [initialForm]);

  const readonly = state?.readonly;

  const [page, setPage] = useState<number>(0);

  const frontPageMethods = useForm<DischargeFrontPageState>({
    defaultValues: defaultFrontPageValues,
    values: initialFrontPageValues,
    resolver: yupResolver(dischargeFrontPageSchema),
  });
  const backPageMethods = useForm<DischargeBackPageState>({
    defaultValues: defaultBackPageValues,
    values: initialBackPageValues,
    resolver: yupResolver(dischargeBackPageSchema),
  });

  const {
    reset: frontPageReset,
    trigger: frontPageTrigger,
    getValues: getFrontPageValues,
  } = frontPageMethods;
  const { reset: backPageReset, formState, handleSubmit: submitForm } = backPageMethods;
console.log({ formState })
  const frontPageState = getFrontPageValues();

  const handleSubmitFrontPage = useCallback(async () => {
    const result = await frontPageTrigger();
    if (result) {
      setPage(1);
    }
  }, [frontPageTrigger]);

  const handleSubmitBackPage = useCallback(
    (data: DischargeBackPageState) => {
      const dischargeRecord = {
        ...frontPageState,
        ...data,
      };

      saveForm(dischargeRecord);
    },
    [frontPageState, saveForm]
  );

  const handleSubmit = useCallback(() => {
    if (page === 0) {
      handleSubmitFrontPage();
      return;
    }
    submitForm(handleSubmitBackPage)();
  }, [handleSubmitBackPage, handleSubmitFrontPage, page, submitForm]);

  const handleReset = useCallback(() => {
    if (page === 0) {
      frontPageReset();
      return;
    }
    backPageReset();
  }, [backPageReset, frontPageReset, page]);

  const handleGoBack = useCallback(() => {
    if (page === 0) {
      navigate(-1);
      return;
    }
    setPage(0);
  }, [navigate, page]);

  return (
    <Container maxWidth={false} sx={containerStyles}>
      <ControlBar
        submitButtonText={!page ? "Далі" : "Зберегти"}
        onClear={handleReset}
        onSubmit={handleSubmit}
        onBack={handleGoBack}
      />
      {page === 0 ? (
        <FormProvider {...frontPageMethods}>
          <FrontPage readonly={readonly} />
        </FormProvider>
      ) : (
        <FormProvider {...backPageMethods}>
          <BackPage readonly={readonly} />
        </FormProvider>
      )}
    </Container>
  );
};

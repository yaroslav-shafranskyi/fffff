import { useCallback, useState, FC } from "react";
import { Card } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

import { ControlBar } from "../../shared";
import { IForm100 } from "../../api";
import { getInitialForm100 } from "../../constants";

import { form100Schema } from "./schemas";
import { containerStyles } from "./styles";
import { Front, Back } from "./components";
import { IForm100PageProps } from "./types";

export const Form100Page: FC<IForm100PageProps> = ({
  readonly,
  initialForm100,
  onSubmit,
}) => {
  const [page, setPage] = useState<number>(0);

  const navigate = useNavigate();

  const methods = useForm<IForm100>({
    defaultValues: getInitialForm100(),
    values: initialForm100,
    resolver: yupResolver(form100Schema),
  });

  const { reset, trigger, handleSubmit: handleSubmitForm100 } = methods;

  const handleGoBack = useCallback(() => {
    if (!page) {
      navigate(-1);
      return;
    }
    setPage(0);
  }, [navigate, page]);

  const navigateToBack = useCallback(async () => {
    const result = await trigger();
    if (result) {
      setPage(1);
    }
  }, [trigger]);

  const handleSubmit = handleSubmitForm100((form) => {
    if (!page) {
      navigateToBack();
      return;
    }
    onSubmit(form);
  });

  return (
    <Card sx={containerStyles}>
      <ControlBar
        submitButtonText={!page ? "Далі" : undefined}
        onClear={reset}
        onSubmit={handleSubmit}
        onBack={handleGoBack}
      />
      {!page ? (
        <FormProvider {...methods}>
          <Front readonly={readonly} />
        </FormProvider>
      ) : (
        <FormProvider {...methods}>
          <Back />
        </FormProvider>
      )}
    </Card>
  );
};

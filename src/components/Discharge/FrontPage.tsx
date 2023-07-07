import { ChangeEvent, useCallback, FC } from "react";
import { Box, Typography } from "@mui/material";
import { FieldPath, useFormContext } from "react-hook-form";

import { Input } from "../../shared";
import { IDischarge } from "../../api";
import { IFCPropsWithReadonly } from "../../interfaces";
import { commonInputStyles, multilineInputStyles } from "../../constants";

import { MinistryOrder, FormHeader } from "../CommonFormHeader";
import {
  boldTextStyles,
  contentTitleWrapperStyles,
  formContentStyles,
  formWrapperStyles,
} from "../commonFormStyles";

import { contentDataWrapperStyles } from "./styles";
import { Receiver, PersonInfo, Dates } from "./components";

export const FrontPage: FC<IFCPropsWithReadonly> = ({ readonly }) => {
  const { formState, setValue, register, clearErrors } =
    useFormContext<IDischarge>();
  const errors = formState.errors;

  const handleInputChange = useCallback(
    (field: FieldPath<IDischarge>) =>
      (event: ChangeEvent<HTMLInputElement>) => {
        if (readonly) {
          return;
        }
        setValue(field, event.target.value);
        clearErrors(field);
      },
    [readonly, setValue, clearErrors]
  );

  return (
    <Box sx={formWrapperStyles}>
      <MinistryOrder />
      <Box sx={formContentStyles}>
        <FormHeader readonly={readonly} formNumber="027/о" />
        <Box sx={contentTitleWrapperStyles}>
          <Typography sx={boldTextStyles}>ВИПИСКА</Typography>
          <Typography sx={boldTextStyles}>
            із медичної карти амбулаторного (стаціонарного) хворого
          </Typography>
        </Box>
        <Box sx={contentDataWrapperStyles}>
          <Receiver readonly={readonly} />
          <PersonInfo readonly={readonly} />
          <Dates readonly={readonly} />
          <Box>
            <Typography>
              8. Повний діагноз (основне захворювання, супутні захворювання та
              ускладнення):
            </Typography>
            <Input
              {...register("fullDiagnosis")}
              onChange={handleInputChange("fullDiagnosis")}
              error={errors?.fullDiagnosis?.message}
              multiline={true}
              rows={12}
              sx={commonInputStyles}
              inputProps={{
                sx: multilineInputStyles,
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

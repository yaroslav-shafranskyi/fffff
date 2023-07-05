import { ChangeEvent, useCallback } from "react";
import { FieldPath, PathValue, useFormContext } from "react-hook-form";
import { Box, Typography } from "@mui/material";

import { Input, CustomDatePicker } from "../../shared";
import { ICommonFormHeaderFields } from "../../api";
import { FieldErrorType } from "../../interfaces";
import { convertNullOrNumberToDate, formatDateWithoutDots } from "../../helpers";

import {
  boldTextStyles,
  codeWrapperStyles,
  dateInputStyles,
  formHeaderInputPropsSx,
  formHeaderInputStyles,
  formHeaderItemStyles,
  formHeaderItemWithTitleStyles,
  formHeaderStyles,
  formHeaderTitleContentStyles,
  formHeaderTitleStyles,
  orderWrapperStyles,
} from "./styles";
import { ICommonFormHeaderProps } from "./types";

export const FormHeader = <T extends ICommonFormHeaderFields>({
  readonly,
  formNumber,
}: ICommonFormHeaderProps) => {
  const { formState, watch, register, setValue, clearErrors } =
    useFormContext<T>();
  const { errors } = formState;

  const handleInputChange = useCallback(
    (field: FieldPath<T>) => (event: ChangeEvent<HTMLInputElement>) => {
      if (!readonly) {
        setValue(field, event.target.value as PathValue<T, FieldPath<T>>);
        clearErrors(field);
      }
    },
    [clearErrors, readonly, setValue]
  );

  const handleDateChange = useCallback(
    (date?: Date) => {
      if (readonly || !date) {
        return;
      }
      setValue(
        "order.date" as FieldPath<T>,
        date.getTime() as PathValue<T, FieldPath<T>>
      );
      clearErrors("order.date" as FieldPath<T>);
    },
    [clearErrors, readonly, setValue]
  );

  return (
    <Box sx={formHeaderStyles}>
      <Box sx={formHeaderItemStyles}>
        <Typography variant="caption">
          Найменування міністерства, іншого органу виконавчої влади,
          підприємства, установи, організації, до сфери управління якого
          належить заклад охорони здоров’я
        </Typography>
        <Input
          sx={formHeaderInputStyles}
          {...register("department" as FieldPath<T>)}
          value={watch("department" as FieldPath<T>)}
          rows={2}
          multiline={true}
          inputProps={{ sx: formHeaderInputPropsSx }}
          onChange={handleInputChange("department" as FieldPath<T>)}
          error={errors?.department?.message as string | undefined}
        />
        <Typography variant="caption">
          Найменування та місцезнаходження (повна поштова адреса) закладу
          охорони здоров’я, де заповнюється форма
        </Typography>
        <Input
          sx={formHeaderInputStyles}
          {...register("clinic" as FieldPath<T>)}
          value={watch("clinic" as FieldPath<T>)}
          error={errors?.clinic?.message as string | undefined}
          onChange={handleInputChange("clinic" as FieldPath<T>)}
        />
        <Box sx={codeWrapperStyles}>
          <Typography variant="caption">Код за ЄДРПОУ</Typography>
          <Box>
            <Input
              sx={formHeaderInputStyles}
              {...register("code" as FieldPath<T>)}
              value={watch("code" as FieldPath<T>)}
              error={errors?.code?.message as string | undefined}
              onChange={handleInputChange("code" as FieldPath<T>)}
            />
          </Box>
        </Box>
      </Box>
      <Box sx={formHeaderItemWithTitleStyles}>
        <Box sx={formHeaderTitleStyles}>
          <Typography sx={boldTextStyles}>МЕДИЧНА ДОКУМЕНТАЦІЯ</Typography>
        </Box>
        <Box sx={formHeaderTitleContentStyles}>
          <Box>
            <Typography>Форма первинної облікової документації</Typography>
            <Typography sx={boldTextStyles}>{`№ ${formNumber}`}</Typography>
          </Box>
          <Typography sx={boldTextStyles}>ЗАТВЕРДЖЕНО</Typography>
          <Box>
            <Typography>Наказ МОЗ України</Typography>
            <Box sx={orderWrapperStyles}>
              <CustomDatePicker onChange={handleDateChange}>
                <Input
                  sx={dateInputStyles}
                  error={
                    (errors?.order as { date?: FieldErrorType })?.date?.message
                  }
                  value={formatDateWithoutDots(
                    convertNullOrNumberToDate(watch("order.date" as FieldPath<T>) as number)
                  )}
                />
              </CustomDatePicker>
              №
              <Box>
                <Input
                  {...register("order.number" as FieldPath<T>)}
                  sx={dateInputStyles}
                  value={watch("order.number" as FieldPath<T>) ?? ""}
                  error={
                    (errors?.order as { number?: FieldErrorType })?.number
                      ?.message
                  }
                  onChange={handleInputChange("order.number" as FieldPath<T>)}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

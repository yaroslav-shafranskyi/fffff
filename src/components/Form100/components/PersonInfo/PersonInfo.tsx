import { useCallback, FC, useMemo, ChangeEvent } from "react";
import { Box, SelectChangeEvent, Typography, SxProps } from "@mui/material";
import { Theme } from "@mui/system";
import { FieldPath, useFormContext } from "react-hook-form";

import {
  DateInputWithSeparatedFields,
  Input,
  Select,
} from "../../../../shared";
import {
  ArmyRank,
  Form100PersonData,
  Gender,
  Rank,
  RecordType,
} from "../../../../api";
import { IFCPropsWithReadonly } from "../../../../interfaces";
import { convertNullOrNumberToDate } from "../../../../helpers";

import { cursorPointerStyles } from "../../styles";
import { IForm100FrontState } from "../../types";

import {
  columnStyles,
  fieldNameStyles,
  fullNameTitleStyles,
  fullWidthInputStyles,
  rowStyles,
  singleElementRowStyles,
  severalFieldsRowStyles,
  reasonWrapperStyles,
  reasonAndNewRecordDateWrapperStyles,
  getFemaleWrapperStyles,
  genderWrapperStyles,
  getReasonWrapperStyles,
} from "./styles";

export const PersonInfo: FC<IFCPropsWithReadonly> = ({ readonly }) => {
  const { formState, register, getValues, setValue, clearErrors } =
    useFormContext<IForm100FrontState>();

  const values = getValues();
  const { person, reason, accidentTime } = values;
  const { rank, gender, personalId, militaryBase, fullName, tokenNumber } =
    person;

  const { person: errors, reason: reasonError } = formState.errors;

  const handleNewRecordDateChange = useCallback(
    (newDate: Date) => {
      if (readonly) {
        return;
      }
      setValue("accidentTime", newDate.getTime());
      clearErrors("accidentTime");
    },
    [clearErrors, readonly, setValue]
  );

  const updateGender = useCallback(
    (value: Gender) => () => {
      if (readonly) {
        return;
      }
      if (gender === value) {
        setValue("person.gender", undefined as unknown as Gender);
        return;
      }
      setValue("person.gender", value);
      clearErrors("person.gender");
    },
    [clearErrors, gender, readonly, setValue]
  );

  const updateReason = useCallback(
    (value: RecordType) => () => {
      if (readonly) {
        return;
      }
      setValue("reason", value);
      clearErrors("reason");
    },
    [clearErrors, readonly, setValue]
  );

  const handleRankChange = useCallback(
    (event: SelectChangeEvent<unknown>) => {
      if (readonly) {
        return;
      }
      setValue("person.rank", event.target.value as Rank);
      clearErrors("person.rank");
    },
    [clearErrors, readonly, setValue]
  );

  const handleInputChange = useCallback(
    (key: FieldPath<Form100PersonData>) =>
      (event: ChangeEvent<HTMLInputElement>) => {
        if (readonly) {
          return;
        }
        setValue(`person.${key}`, event.target.value);
        clearErrors(`person.${key}`);
      },
    [clearErrors, readonly, setValue]
  );

  const getReasonColor = <T extends string>(option: T, reason: RecordType) =>
    option === reason && reason !== undefined ? "error" : "textPrimary";

  const getGenderColor = <T extends string>(option: T, gender?: Gender) =>
    option === gender && gender !== undefined ? "success.light" : "textPrimary";

  const optionWrapperSx: SxProps<Theme> = useMemo(
    () => (readonly ? {} : cursorPointerStyles),
    [readonly]
  );

  const accidentTimeError = formState.errors?.accidentTime?.message;
  return (
    <>
      <Box sx={rowStyles}>
        <Box sx={columnStyles}>
          <Box sx={fieldNameStyles}>
            <Typography>в/звання</Typography>
          </Box>
          <Box sx={{ width: "100% " }}>
            <Select
              {...register("person.rank")}
              onChange={handleRankChange}
              value={rank ?? ""}
              options={Object.values(ArmyRank)}
              sx={{ fontSize: "0.6rem" }}
              error={errors?.rank?.message}
            />
          </Box>
        </Box>
        <Box sx={columnStyles}>
          <Box>
            <Typography>в/ч, з’єднання</Typography>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Input
              fullWidth={true}
              {...register("person.militaryBase")}
              onChange={handleInputChange("militaryBase")}
              value={militaryBase ?? ""}
              error={errors?.militaryBase?.message}
            />
          </Box>
        </Box>
      </Box>
      <Box sx={singleElementRowStyles}>
        <Input
          sx={fullWidthInputStyles}
          {...register("person.fullName")}
          onChange={handleInputChange("fullName")}
          value={fullName ?? ""}
          error={errors?.fullName?.message}
        />
        <Box sx={fullNameTitleStyles}>
          <Typography>прізвище</Typography>
          <Typography>ім’я</Typography>
          <Typography>по батькові</Typography>
        </Box>
      </Box>
      <Box sx={severalFieldsRowStyles}>
        <Box sx={fieldNameStyles}>
          <Typography>Посвідчення особи</Typography>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Input
            sx={fullWidthInputStyles}
            {...register("person.personalId")}
            onChange={handleInputChange("personalId")}
            value={personalId ?? ""}
            error={errors?.personalId?.message}
          />
        </Box>
      </Box>
      <Box sx={severalFieldsRowStyles}>
        <Box sx={fieldNameStyles}>
          <Typography>Особистий №</Typography>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Input
            sx={fullWidthInputStyles}
            {...register("person.tokenNumber")}
            onChange={handleInputChange("tokenNumber")}
            value={tokenNumber ?? ""}
            error={errors?.tokenNumber?.message}
          />
        </Box>
        <Box>
          <Box sx={genderWrapperStyles}>
            <Typography>Стать: </Typography>
            <Box sx={optionWrapperSx} onClick={updateGender(Gender.MALE)}>
              <Typography color={getGenderColor(Gender.MALE, gender)}>
                {Gender.MALE}
              </Typography>
            </Box>
            <Box
              sx={getFemaleWrapperStyles(readonly)}
              onClick={updateGender(Gender.FEMALE)}
            >
              <Typography color={getGenderColor(Gender.FEMALE, gender)}>
                {Gender.FEMALE}
              </Typography>
            </Box>
          </Box>
          <Typography color="error">{errors?.gender?.message}</Typography>
        </Box>
      </Box>
      <Box sx={reasonAndNewRecordDateWrapperStyles}>
        <Box>
          <Box sx={reasonWrapperStyles}>
            <Box
              sx={getReasonWrapperStyles(readonly)}
              onClick={updateReason(RecordType.INJURY)}
            >
              <Typography color={getReasonColor(RecordType.INJURY, reason)}>
                Поранений
              </Typography>
              <Typography>,</Typography>
            </Box>
            <Box sx={optionWrapperSx} onClick={updateReason(RecordType.SICK)}>
              <Typography color={getReasonColor(RecordType.SICK, reason)}>
                захворів
              </Typography>
            </Box>
          </Box>
          <Typography color="error">{reasonError?.message}</Typography>
        </Box>
        <Box>
          <DateInputWithSeparatedFields
            date={convertNullOrNumberToDate(accidentTime)}
            onChange={handleNewRecordDateChange}
          />
          {accidentTimeError !== undefined && (
            <Typography color="error">{accidentTimeError}</Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

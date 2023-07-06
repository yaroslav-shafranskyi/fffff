import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  Box,
  Checkbox,
  IconButton,
  InputAdornment,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

import { DateRange } from "../../interfaces";

import { DatePicker } from "../DatePicker";

import { IFilterProps, TableFilterType } from "./types";
import {
  datePickerStyles,
  dateRangeFilterPickerStyles,
  dateRangePickerStyles,
  optionsFilterWrapperStyles,
} from "./styles";

const convertDateRangeSingleValue = (
  field: "start" | "end",
  value?: Date | null
) => {
  if (!value) {
    return field === "start" ? -Infinity : Infinity;
  }
  return value.getTime();
};

export const Filter = <T extends object>(props: IFilterProps<T>) => {
  const { fieldFilterData, filterBy, onChange } = props;

  const {
    key,
    title,
    placeholder,
    type = TableFilterType.STRING,
    options,
    range,
  } = fieldFilterData;

  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    if (type === TableFilterType.STRING) {
      setInputValue((filterBy[key] as string) ?? "");
    }
  }, [type, filterBy, key]);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setInputValue(value);
      if (!value) {
        onChange({ ...filterBy, [key]: "" });
      }
    },
    [key, filterBy, onChange]
  );

  const handleDateChange = useCallback(
    (value?: Date) => {
      onChange({ ...filterBy, [key]: value?.getTime() });
    },
    [filterBy, key, onChange]
  );

  const handleDateRangeChange = useCallback(
    (field: "start" | "end") => (value?: Date) => {
      if (field === "start") {
        onChange({
          ...filterBy,
          [key]: [
            convertDateRangeSingleValue(field, value),
            (filterBy[key] as [number, number])?.[1] ?? 2 * Date.now(),
          ],
        });
        return;
      }
      onChange({
        ...filterBy,
        [key]: [
          (filterBy[key] as [number, number] | undefined)?.[0] ?? -Date.now(),
          convertDateRangeSingleValue(field, value),
        ],
      });
    },
    [filterBy, key, onChange]
  );

  const handleSubmitFilter = useCallback(() => {
    onChange({ ...filterBy, [key]: inputValue });
  }, [filterBy, inputValue, key, onChange]);

  const handleEnterPress = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        handleSubmitFilter();
      }
    },
    [handleSubmitFilter]
  );

  const handleOptionSelect = useCallback(
    (value: unknown) => () => {
      const isSelected = filterBy?.[key] === value;
      if (isSelected) {
        onChange({ ...filterBy, [key]: undefined });
        return;
      }
      onChange({ ...filterBy, [key]: value });
    },
    [filterBy, key, onChange]
  );

  const handleRangeChange = useCallback(
    (_event: Event, value: number | number[]) => {
      onChange({ ...filterBy, [key]: value });
    },
    [filterBy, key, onChange]
  );

  return (
    <Box>
      {type === TableFilterType.STRING && !options && (
        <TextField
          size="small"
          value={inputValue}
          placeholder={placeholder ?? title}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={handleSubmitFilter}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
            sx: { pl: 0 },
          }}
          onChange={handleInputChange}
          onKeyPress={handleEnterPress}
        />
      )}
      {type === TableFilterType.DATE && (
        <DatePicker
          value={filterBy?.[key] as Date | undefined}
          sx={datePickerStyles}
          onChange={handleDateChange}
        />
      )}
      {type === TableFilterType.DATE_RANGE && (
        <Box sx={dateRangeFilterPickerStyles}>
          <DatePicker
            value={(filterBy?.[key] as DateRange | undefined)?.[0] ?? undefined}
            sx={dateRangePickerStyles}
            onChange={handleDateRangeChange("start")}
          />
          <Box>-</Box>
          <DatePicker
            value={(filterBy?.[key] as DateRange | undefined)?.[1] ?? undefined}
            sx={dateRangePickerStyles}
            format="dd.MM.yy"
            onChange={handleDateRangeChange("end")}
          />
        </Box>
      )}
      {options !== undefined &&
        options.map((option) => (
          <Box
            sx={optionsFilterWrapperStyles}
            onClick={handleOptionSelect(option)}
          >
            <Checkbox checked={filterBy?.[key] === option} />
            <Typography>{option}</Typography>
          </Box>
        ))}
      {type === TableFilterType.RANGE && (
        <>
          <Slider
            min={range?.min}
            max={range?.max}
            defaultValue={[range?.min ?? 0, range?.max ?? 100]}
            value={filterBy?.[key] as number | [number, number]}
            valueLabelDisplay="on"
            onChange={handleRangeChange}
          />
        </>
      )}
    </Box>
  );
};

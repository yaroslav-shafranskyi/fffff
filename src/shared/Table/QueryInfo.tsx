import { useCallback, useMemo } from "react";
import { Stack, Chip } from "@mui/material";
import { Close as ClearIcon } from "@mui/icons-material";

import { SortOrder, Range } from "../../interfaces";

import { IQueryInfoProps, SortTitlesType, TableFilterType } from "./types";
import {
  checkIfNullish,
  convertNullOrNumberToDate,
  formatDate,
} from "../../helpers";

export const QueryInfo = <T extends object>(props: IQueryInfoProps<T>) => {
  const { query, queryData, onChange } = props;
  const { sortBy, filterBy } = query;
  const { sorts: sortsData, filters: filtersData } = queryData;

  const removeSortBy = useCallback(() => {
    onChange("sortBy")(undefined);
  }, [onChange]);

  const removeFilterBy = useCallback(
    (key: string) => () => {
      onChange("filterBy")({ ...filterBy, [key]: undefined });
    },
    [filterBy, onChange]
  );

  const { optionTitle: sortOptionTitle, infoTitle: sortInfoTitle } =
    useMemo(() => {
      if (!sortBy || !sortsData) {
        return {} as SortTitlesType;
      }
      const [sortByKey, sortByValue] = Object.entries(sortBy)[0];
      return sortsData[sortByKey][sortByValue as SortOrder];
    }, [sortBy, sortsData]);

  const filtersInfo = useMemo(
    () =>
      filtersData?.reduce((acc: [string, string, string][], cur) => {
        cur.fields.forEach((field) => {
          const { key, title, type } = field;
          const value = filterBy[key];
          if (value === undefined || value === null) {
            return acc;
          }
          const formattedTitle =
            (key === "Any" ? "Загальний пошук" : title) ?? key;
          if (type === TableFilterType.DATE) {
            const convertedValue = formatDate(
              convertNullOrNumberToDate(value as number)
            );
            acc.push([key, formattedTitle, convertedValue]);
          }
          if (type === TableFilterType.DATE_RANGE) {
            const [from, till] = value as Range;
            const hasOnlyFrom = !checkIfNullish(from) && checkIfNullish(till);
            if (hasOnlyFrom) {
              const convertedValue = `${formatDate(
                convertNullOrNumberToDate(from)
              )} ->`;
              acc.push([key, formattedTitle, convertedValue]);
              return acc;
            }
            const hasOnlyTill = checkIfNullish(from) && !checkIfNullish(till);
            if (hasOnlyTill) {
              const convertedValue = `-> ${formatDate(
                convertNullOrNumberToDate(till)
              )}`;
              acc.push([key, formattedTitle, convertedValue]);
              return acc;
            }
            const hasBoth = !checkIfNullish(from) && !checkIfNullish(till);
            if (hasBoth) {
              const convertedValue = `${formatDate(
                convertNullOrNumberToDate(from)
              )} -> ${formatDate(convertNullOrNumberToDate(till))}`;
              acc.push([key, formattedTitle, convertedValue]);
            }
          }
          if (!type || type === TableFilterType.STRING) {
            acc.push([key, formattedTitle, String(value)]);
          }
        });
        return acc;
      }, []) ?? [],
    [filterBy, filtersData]
  );

  return (
    <Stack direction="row" spacing={1}>
      {sortOptionTitle !== undefined && (
        <Chip
          label={sortInfoTitle ?? sortOptionTitle}
          variant="outlined"
          deleteIcon={<ClearIcon />}
          onDelete={removeSortBy}
        />
      )}
      {!!filterBy.Any && (
        <Chip
          label={`Загальний пошук: ${filterBy.Any}`}
          variant="outlined"
          deleteIcon={<ClearIcon />}
          onDelete={removeFilterBy("Any")}
        />
      )}
      {filtersInfo.map(([key, title, value]) => {
        return (
          <Chip
            label={`${title}: ${value}`}
            variant="outlined"
            deleteIcon={<ClearIcon />}
            onDelete={removeFilterBy(key)}
          />
        );
      })}
    </Stack>
  );
};

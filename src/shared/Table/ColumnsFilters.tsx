import { useState, Fragment, useEffect, useCallback } from "react";
import {
  Button,
  Typography,
  IconButton,
  Box,
  Popover,
  Divider,
} from "@mui/material";
import {
  FilterAltOutlined as FilterIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

import { IQuery } from "../../interfaces";
import { clearButtonStyles, getInitialQuery } from "../../constants";

import { IColumnsFiltersProps } from "./types";
import {
  columnsFilterActionsWrapperStyles,
  columnsFiltersButtonStyles,
  columnsFiltersHeaderStyles,
  filterFieldWrapperStyles,
  filterGroupWrapperStyles,
  filtersMenuStyles,
  filtersPopoverStyles,
} from "./styles";
import { Filter } from "./Filter";
import { Sort } from "./Sort";

export const ColumnsFilter = <T extends object>(
  props: IColumnsFiltersProps<T>
) => {
  const { queryData = {}, query: propsQuery, onChange } = props;

  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<IQuery<T>>(propsQuery);

  const { filterBy, sortBy } = query ?? {};
  const { filters, sorts } = queryData;

  useEffect(() => {
    setQuery(propsQuery);
  }, [propsQuery]);

  const updateQuery = useCallback(
    (key: keyof IQuery<T>) => (value: unknown) => {
      setQuery((prevQuery) => ({ ...prevQuery, [key]: value }));
    },
    []
  );

  const handleOpenMenu = () => {
    setOpen(true);
  };
  const handleCloseMenu = () => {
    setOpen(false);
  };

  const handleClear = () => {
    setQuery(getInitialQuery());
  };

  const handleSubmit = useCallback(() => {
    onChange(query);
    handleCloseMenu();
  }, [query, onChange]);

  return (
    <>
      <Button
        variant="contained"
        color="inherit"
        sx={columnsFiltersButtonStyles}
        onClick={handleOpenMenu}
      >
        ФІЛЬТРИ
        <FilterIcon />
      </Button>
      <Popover
        open={open}
        sx={filtersPopoverStyles}
        anchorOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        PaperProps={{
          sx: filtersMenuStyles,
        }}
        onClose={handleCloseMenu}
      >
        <Box sx={columnsFiltersHeaderStyles}>
          <Typography sx={{ fontWeight: "bold" }} variant="h5">
            Фільтри
          </Typography>
          <IconButton onClick={handleCloseMenu}>
            <CloseIcon />
          </IconButton>
        </Box>
        {filters !== undefined &&
          filters.map(({ title: groupTitle, fields }, idx) => (
            <Fragment key={groupTitle ?? fields[0].key + "Group"}>
              <Box sx={filterGroupWrapperStyles}>
                {groupTitle !== undefined && (
                  <Typography variant="h5">{groupTitle}</Typography>
                )}
                {fields.map((fieldData) => {
                  const { key, title } = fieldData;
                  const sortData = sorts?.[key];
                  return (
                    <Box key={key} sx={filterFieldWrapperStyles}>
                      {title !== undefined && <Typography>{title}</Typography>}
                      <Filter
                        fieldFilterData={fieldData}
                        filterBy={filterBy}
                        onChange={updateQuery("filterBy")}
                      />
                      {sortData !== undefined && (
                        <Sort
                          field={key as keyof T}
                          fieldSortData={sortData}
                          sortBy={sortBy}
                          onChange={updateQuery("sortBy")}
                        />
                      )}
                    </Box>
                  );
                })}
              </Box>
              {idx !== filters.length - 1 && (
                <Divider orientation="horizontal" />
              )}
            </Fragment>
          ))}
        <Box sx={columnsFilterActionsWrapperStyles}>
          <Button
            sx={clearButtonStyles}
            variant="contained"
            onClick={handleClear}
          >
            ОЧИСТИТИ
          </Button>
          <Button variant="contained" color="inherit" onClick={handleSubmit}>
            ЗАСТОСУВАТИ
          </Button>
        </Box>
      </Popover>
    </>
  );
};

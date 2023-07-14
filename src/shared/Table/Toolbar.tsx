import { useCallback } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { ArrowBack as BackIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { IQuery } from "../../interfaces";
import { getInitialQuery } from "../../constants";

import { IToolbarProps } from "./types";
import { titleWrapperStyles, toolbarWrapperStyles } from "./styles";
import { Filter } from "./Filter";
import { ColumnsFilter } from "./ColumnsFilters";
import { QueryInfo } from "./QueryInfo";

export const Toolbar = <T extends object>(props: IToolbarProps<T>) => {
  const {
    query = getInitialQuery(),
    title,
    columns,
    queryData = {},
    isMinor,
    goBack,
    onChange,
  } = props;

  const { filterBy } = query;
  const { globalFilter } = queryData;

  const navigate = useNavigate();

  const handleGoBack = useCallback(() => {
    if (goBack) {
      goBack();
      return;
    }
    navigate(-1);
  }, [navigate, goBack]);

  const updateQuery = useCallback(
    (field: keyof IQuery<T>) => (value: unknown) => {
      onChange?.({ ...query, [field]: value });
    },
    [query, onChange]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={toolbarWrapperStyles}>
        <Box sx={titleWrapperStyles}>
          {!isMinor && (
            <IconButton onClick={handleGoBack}>
              <BackIcon />
            </IconButton>
          )}
          <Typography variant="h5">{title}</Typography>
        </Box>
        <Box sx={titleWrapperStyles}>
          {globalFilter !== undefined && (
            <Filter
              fieldFilterData={globalFilter}
              filterBy={filterBy}
              columns={columns}
              onChange={updateQuery?.("filterBy")}
            />
          )}
          <ColumnsFilter
            queryData={queryData}
            query={query}
            onChange={onChange}
          />
        </Box>
      </Box>
      <QueryInfo query={query} queryData={queryData} onChange={updateQuery} />
    </Box>
  );
};

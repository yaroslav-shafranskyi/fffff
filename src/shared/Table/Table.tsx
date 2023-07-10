import { useCallback } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Typography,
  Table as MuiTable,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Tooltip,
} from "@mui/material";

import { getInitialQuery } from "../../constants/query/query";
import { IQuery } from "../../interfaces";

import {
  headerCellStyles,
  headerStyles,
  placeholderStyles,
  tableRowStyles,
  tableStyles,
} from "./styles";
import { ITableProps } from "./types";
import { Toolbar } from "./Toolbar";
import { Pagination } from "./Pagination";

export const Table = <TData extends object>(props: ITableProps<TData>) => {
  const {
    data,
    columns: propsColumns,
    total: propsTotal,
    title,
    queryData,
    query = getInitialQuery(),
    onQueryChange,
    goBack,
    onRowClick,
    ...restProps
  } = props;

  const { iterator } = query;

  const columnHelper = createColumnHelper<TData>();

  const columns = propsColumns.map(({ title, key, accessor, render }) => {
    const columnAccessor = (d: TData) => {
      if (!accessor) {
        return d[key as keyof TData];
      }
      return accessor(d);
    };
    return columnHelper.accessor(columnAccessor, {
      header: () => (
        <Tooltip title={title} sx={{ cursor: "pointer" }}>
          <Typography>{title}</Typography>
        </Tooltip>
      ),
      cell: render,
      id: String(key),
    });
  });

  const table = useReactTable<TData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const total = propsTotal ?? table.getRowModel().rows.length;

  const handleQueryChange = useCallback(
    (field: keyof IQuery<TData>) => (value: unknown) => {
      onQueryChange?.((prevQuery) => ({ ...prevQuery, [field]: value }));
    },
    [onQueryChange]
  );

  const handleSubmitQuery = useCallback(
    (newQuery: IQuery<TData>) => {
      onQueryChange?.(newQuery);
    },
    [onQueryChange]
  );

  return (
    <>
      <Toolbar
        title={title}
        query={query}
        columns={propsColumns}
        queryData={queryData}
        goBack={goBack}
        onChange={handleSubmitQuery}
      />
      <TableContainer component={Paper}>
        <MuiTable sx={tableStyles} {...restProps}>
          <TableHead sx={headerStyles}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    variant="head"
                    key={header.id}
                    sx={headerCellStyles}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {!total && (
              <TableRow sx={{ position: "relative" }}>
                <TableCell sx={placeholderStyles}>
                  <Typography variant="h5" color="text.secondary">
                    Нікого не знайдено
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {total > 0 &&
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={onRowClick?.(row)}
                  sx={onRowClick ? tableRowStyles : {}}
                >
                  {row.getVisibleCells().map((cell, cellIdx) => (
                    <TableCell key={cell.id} sx={{ p: !cellIdx ? 1 : 0.25 }}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </MuiTable>
        <Pagination
          total={total}
          iterator={iterator}
          onChange={handleQueryChange("iterator")}
        />
      </TableContainer>
    </>
  );
};

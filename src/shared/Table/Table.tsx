import { useCallback, useMemo } from 'react';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
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
} from '@mui/material';

import { getInitialQuery } from '../../constants/query/query';
import { IFilter, IQuery } from '../../interfaces';

import {
    headerCellStyles,
    headerStyles,
    placeholderStyles,
    tableStyles
} from './styles';
import { ITableProps } from './types';
import { Toolbar } from './Toolbar';
import { Pagination } from './Pagination';

export const Table = <TData extends object>(props: ITableProps<TData>) => {
    const {
        data,
        columns: propsColumns,
        total: propsTotal,
        title,
        globalFilterPlaceholder,
        query = getInitialQuery(),
        onQueryChange,
        goBack,
        ...restProps
    } = props;

    const { sortBy, filterBy, iterator } = query;

    const columnHelper = createColumnHelper<TData>();

    const columns = propsColumns.map(({ title, key, accessor, render }) => {
        const columnAccessor = (d: TData) => {
            if (!accessor) {
                return d[key as keyof TData]
            }
            return accessor(d);
        }
        return columnHelper.accessor(columnAccessor, {
            header: () => (
                <Tooltip title={title} sx={{ cursor: 'pointer' }}>
                    <Typography>{title}</Typography>
                </Tooltip>
            ),
            cell: render,
            id: String(key),
        })
    });

    const table = useReactTable<TData>({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const total = propsTotal ?? table.getRowModel().rows.length;

    const hasFilters = useMemo(() => Object.keys(filterBy).length > 0, [filterBy]);

    const handleQueryChange = useCallback((field: keyof IQuery<TData>) =>
        (value: unknown) => {
            onQueryChange?.(prevQuery => ({ ...prevQuery, [field]: value }));
    }, [onQueryChange]);

    const clearFilter = useCallback((field: string) => () => {
        const newFilterBy: IFilter = {};
        for (const key in filterBy) {
            if (key !== field) {
                newFilterBy[key] = filterBy[key];
            }
        }
        handleQueryChange('filterBy')(newFilterBy);
    }, [filterBy, handleQueryChange]);

    return (
        <>
            <Toolbar
                title={title}
                filterBy={filterBy}
                columns={propsColumns}
                globalFilterPlaceholder={globalFilterPlaceholder}
                clearFilter={clearFilter}
                goBack={goBack}
                onChange={handleQueryChange}
            />
            <TableContainer component={Paper}>
                <MuiTable sx={tableStyles} {...restProps}>
                    <TableHead sx={headerStyles}>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <TableCell variant='head' key={header.id} sx={headerCellStyles}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody>
                        {!total &&
                            <TableRow sx={{ position: 'relative' }}>
                                <TableCell sx={placeholderStyles}>
                                    <Typography variant='h5' color='text.secondary'>
                                        Нікого не знайдено
                                    </Typography>
                                </TableCell>
                            </TableRow>}
                        {total > 0 && table.getRowModel().rows.map(row => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <TableCell key={cell.id} sx={{ p: .25 }}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </MuiTable>
                <Pagination total={total} iterator={iterator} onChange={handleQueryChange('iterator')} />
            </TableContainer>
        </>
    );
};
import { useCallback, useState } from 'react';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import {
    Typography,
    Table as MuiTable,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    Paper,
    Box,
} from '@mui/material';

import { getInitialQuery } from '../../constants/query/query';
import { IQuery } from '../../interfaces';

import {
    headerCellContentStyles,
    headerCellStyles,
    headerStyles,
    placeholderStyles,
    tableStyles
} from './styles';
import { ITableProps } from './types';
import { Filter } from './Filter';
import { Sort } from '.';

export const Table = <TData extends object>(props: ITableProps<TData>) => {
    const {
        data,
        columns,
        total: propsTotal,
        query = getInitialQuery(),
        onQueryChange,
        ...restProps
    } = props;

    const { sortBy, filterBy } = query;

    const table = useReactTable<TData>({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const total = propsTotal ?? table.getRowModel().rows.length;

    const [focusedFilter, setFocusedFilter] = useState<string>();

    const handleQueryChange = useCallback((field: keyof IQuery<TData>) =>
        (value: unknown) => {
            onQueryChange?.(prevQuery => ({ ...prevQuery, [field]: value }));
    }, [onQueryChange]);

    return (
        <TableContainer component={Paper}>
            <MuiTable sx={tableStyles} {...restProps}>
                <TableHead sx={headerStyles}>
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <TableCell key={header.id} sx={headerCellStyles}>
                                    <Box sx={headerCellContentStyles}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        <Filter
                                            field={header.id}
                                            isFocused={header.id === focusedFilter}
                                            setFocused={setFocusedFilter}
                                            onChange={handleQueryChange('filterBy')}
                                        />
                                        <Sort field={header.id as keyof TData} sortBy={sortBy} onChange={handleQueryChange('sortBy')} />
                                    </Box>
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
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </MuiTable>
        </TableContainer>
    );
};
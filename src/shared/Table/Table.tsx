import { flexRender } from '@tanstack/react-table';
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

import {
    headerCellContentStyles,
    headerCellStyles,
    headerStyles,
    placeholderStyles,
    tableStyles
} from './styles';
import { ITableProps } from './types';
import { Filter } from './Filter';

export const Table = <TData, >(props: ITableProps<TData>) => {
    const { table, data, ...restProps } = props;
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
                                        <Filter column={header.column} table={table} />
                                    </Box>
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody>
                    {!data.length &&
                        <TableRow sx={{ position: 'relative' }}>
                            <TableCell sx={placeholderStyles}>
                                <Typography variant='h5' color='text.secondary'>
                                    Нікого не знайдено
                                </Typography>
                            </TableCell>
                        </TableRow>}
                    {data.length > 0 && table.getRowModel().rows.map(row => (
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
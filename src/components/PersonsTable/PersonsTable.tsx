import { FC } from 'react';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import {
    Typography,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Card,
    TableContainer,
    Paper,
    Box,
    IconButton
} from '@mui/material';
import { ArrowBack as BackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { IPerson, useQueryPersons } from '../../api';

import { backButtonStyles, containerStyles, placeholderStyles, tableStyles } from './styles';
import { formatDate } from '../../helpers';

export const PersonsTable: FC = () => {
    const navigate = useNavigate();

    const persons = useQueryPersons();

    const columnHelper = createColumnHelper<IPerson>();

    const columns = [
        columnHelper.accessor(p => p.fullName, {
            header: () => <Typography>ПІП</Typography>,
            cell: p => p.getValue(),
            id: 'fullName',
        }),
        columnHelper.accessor(p => p.rank, {
            header: () => <Typography>Звання</Typography>,
            cell: p => p.getValue(),
            id: 'rank',
        }),
        columnHelper.accessor(p => p.id, {
            header: () => <Typography>Посвідчення особи</Typography>,
            cell: p => p.getValue(),
            id: 'ID',
        }),
        columnHelper.accessor(p => p.birthDate, {
            header: () => <Typography>Дата народження</Typography>,
            cell: p => formatDate(p.getValue()),
            id: 'birthDate',
        }),
        columnHelper.accessor(p => p.gender, {
            header: () => <Typography>Стать</Typography>,
            cell: p => p.getValue(),
            id: 'gender',
        }),
        columnHelper.accessor(p => p.militaryBase, {
            header: () => <Typography>Військова частина</Typography>,
            cell: p => p.getValue(),
            id: 'militaryBase',
        }),
        columnHelper.accessor(p => p.records.length, {
            header: () => <Typography>Кількість звернень</Typography>,
            cell: p => p.getValue(),
            id: 'recordsLength',
        }),
        columnHelper.accessor(p => p.lastRecord.date, {
            header: () => <Typography>Дата крайнього звернення</Typography>,
            cell: p => formatDate(p.getValue()),
            id: 'lastRecordDate',
        }),
        columnHelper.accessor(p => p.lastRecord.diagnosis, {
            header: () => <Typography>Крайній діагноз</Typography>,
            cell: p => p.getValue(),
            id: 'lastRecordDiagnosis',
        }),
    ];

    const table = useReactTable<IPerson>({
        data: persons,
        columns,
        getCoreRowModel: getCoreRowModel(), 
    });

    const goBack = () => {
        navigate(-1);
    };

    return (
        <Card sx={containerStyles}>
            <Box>
                <IconButton sx={backButtonStyles} onClick={goBack}>
                    <BackIcon />
                </IconButton>
                <Typography variant='h4' sx={{ textAlign: 'center' }}>Список поранених військовослужбовців</Typography>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={tableStyles}>
                    <TableHead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <TableCell key={header.id}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody>
                        {!persons.length &&
                            <TableRow sx={{ position: 'relative' }}>
                                <TableCell sx={placeholderStyles}>
                                    <Typography variant='h5' color='text.secondary'>
                                        Нікого не знайдено
                                    </Typography>
                                </TableCell>
                            </TableRow>}
                        {persons.length > 0 && table.getRowModel().rows.map(row => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
};

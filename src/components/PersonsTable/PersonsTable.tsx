import { FC, useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import {
    Typography,
    Card,
    Box,
    IconButton,
} from '@mui/material';
import { ArrowBack as BackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { IPerson, useQueryPersons } from '../../api';

import { backButtonStyles, containerStyles } from './styles';
import { formatDate } from '../../helpers';
import { Table } from '../../shared';
import { getInitialQuery } from '../../constants';
import { IQuery } from '../../interfaces';

export const PersonsTable: FC = () => {
    const [query, setQuery] = useState<IQuery<IPerson>>(getInitialQuery())

    const navigate = useNavigate();

    const persons = useQueryPersons(query);

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

    const goBack = () => {
        navigate('/');
    };

    return (
        <Card sx={containerStyles}>
            <Box>
                <IconButton sx={backButtonStyles} onClick={goBack}>
                    <BackIcon />
                </IconButton>
                <Typography variant='h4' sx={{ textAlign: 'center' }}>Список поранених військовослужбовців</Typography>
            </Box>
            <Table<IPerson>
                data={persons}
                columns={columns}
                query={query}
                onQueryChange={setQuery}
            />
        </Card>
    );
};

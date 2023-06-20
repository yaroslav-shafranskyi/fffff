import { FC, useState } from 'react';
import {
    Typography,
    Card,
    Box,
    IconButton,
    Container,
} from '@mui/material';
import { ArrowBack as BackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { IPerson, useQueryPersons } from '../../api';
import { formatDate } from '../../helpers';
import { IColumn, Table } from '../../shared';
import { getInitialQuery } from '../../constants';
import { IQuery } from '../../interfaces';

import { Header } from '../Header';

import { backButtonStyles, containerStyles } from './styles';

export const PersonsTable: FC = () => {
    const [query, setQuery] = useState<IQuery<IPerson>>(getInitialQuery())

    const navigate = useNavigate();

    const { data: persons, total } = useQueryPersons(query);

    const columns: IColumn<IPerson>[] = [
        {
            title: 'ПІБ',
            render: p => p.getValue() as string,
            key: 'fullName',
        },
        {
            title: 'Звання',
            render: p => p.getValue() as string,
            key: 'rank',
        },
        {
            title: 'Посвідчення особи',
            render: p => p.getValue() as string,
            key: 'id',
        },
        {
            title: 'Дата народження',
            render: p => formatDate(p.getValue() as Date),
            key: 'birthDate',
        },
        {
            title: 'Стать',
            render: p => (p.getValue() as string).toLowerCase() + '.',
            key: 'gender',
        },
        {
            title: 'Військова частина',
            render: p => p.getValue() as string,
            key: 'militaryBase',
        },
        {
            title: 'К-ть звернень',
            render: p => p.getValue() as number,
            accessor: p => p.records.length,
            key: 'recordsLength',
        },
        {
            title: 'Крайнє звернення',
            render: p => formatDate(p.getValue() as Date),
            accessor: p => p.lastRecord.date,
            key: 'lastRecordDate',
        },
        {
            title: 'Крайній діагноз',
            render: p => p.getValue() as string,
            accessor: p => p.lastRecord.diagnosis,
            key: 'lastRecordDiagnosis',
        },
    ];

    const goBack = () => {
        navigate('/');
    };

    return (
        <>
            <Header />
            <Container maxWidth={false} sx={containerStyles}>
                <Table<IPerson>
                    data={persons}
                    columns={columns}
                    query={query}
                    total={total}
                    title='Перелік поранених військовослужбовців'
                    globalFilterPlaceholder='Впишіть ПІБ або діагноз...'
                    goBack={goBack}
                    onQueryChange={setQuery}
                />
            </Container>
        </>
    );
};

import { FC, useState } from 'react';
import { Container } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { RowData } from '@tanstack/react-table';

import { IPerson, useQueryPersons } from '../../api';
import { Table } from '../../shared';
import { getInitialQuery } from '../../constants';
import { IQuery } from '../../interfaces';

import { Header } from '../Header';

import { containerStyles } from './styles';
import { columns, queryData } from './constants';

export const PersonsTable: FC = () => {
    const [query, setQuery] = useState<IQuery<IPerson>>(getInitialQuery())

    const navigate = useNavigate();
    const { pathname } = useLocation();

    const { persons, total } = useQueryPersons(query);
    console.log({ persons });
    const goBack = () => {
        navigate('/');
    };

    const goToPerson = (row: RowData) => () => {
        const { id } = (row as { original: IPerson }).original;
        navigate(`${pathname}/${decodeURI(id)}`);
    }

    return (
        <>
            <Header />
            <Container maxWidth={false} sx={containerStyles}>
                <Table<IPerson>
                    data={persons}
                    columns={columns}
                    query={query}
                    queryData={queryData}
                    total={total}
                    title='Перелік поранених військовослужбовців'
                    goBack={goBack}
                    onQueryChange={setQuery}
                    onRowClick={goToPerson}
                />
            </Container>
        </>
    );
};

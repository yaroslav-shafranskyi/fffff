import { FC, useState } from 'react';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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

    const { data: persons, total } = useQueryPersons(query);

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
                    queryData={queryData}
                    total={total}
                    title='Перелік поранених військовослужбовців'
                    goBack={goBack}
                    onQueryChange={setQuery}
                />
            </Container>
        </>
    );
};

import { Fragment, useCallback, useMemo } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { ArrowBack as BackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { IFilter } from '../../interfaces';
import { getInitialQuery } from '../../constants';

import { IToolbarProps } from './types';
import { titleWrapperStyles, toolbarWrapperStyles } from './styles';
import { Filter } from './Filter';
import { ColumnsFilter } from './ColumnsFilters';

export const Toolbar = <T extends object>(props: IToolbarProps<T>) => {
    const {
        query = getInitialQuery(),
        title,
        columns,
        queryData = {}, 
        goBack,
        clearFilter,
        onChange
    } = props;

    const { filterBy } = query;

    const navigate = useNavigate();

    const handleGoBack = useCallback(() => {
        if (goBack) {
            goBack();
            return;
        }
        navigate(-1);
    }, [navigate, goBack]);

    const getToolbarFilterTitle = useCallback((key: string) => {
        const column = columns.find(col => col.key === key);
        if (!column) {
            return 'Невідоме поле'
        }
        return column.title
    }, [columns]);

    const globalFilterData = useMemo(() => queryData.filters?.find(({ key }) => key === 'Any'), [queryData]);

    return (
        <Box sx={toolbarWrapperStyles}>
            <Box sx={titleWrapperStyles}>
                <IconButton onClick={handleGoBack}>
                    <BackIcon />
                </IconButton>
                <Typography variant='h4'>{title}</Typography>
            </Box>
            <Box sx={titleWrapperStyles}>
                {globalFilterData !== undefined && 
                    <Filter
                        fieldFilterData={globalFilterData}
                        filterBy={filterBy}
                        columns={columns}
                        onChange={onChange?.('filterBy') as (value: IFilter) => void}
                    />
                }
                <ColumnsFilter
                    queryData={queryData}
                    query={query}
                    onChange={onChange}
                />
            </Box>
        </Box>
    );
};

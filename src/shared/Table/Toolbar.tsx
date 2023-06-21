import { useCallback } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { ArrowBack as BackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { IFilter } from '../../interfaces';
import { getInitialQuery } from '../../constants';

import { IToolbarProps } from './types';
import { titleWrapperStyles, toolbarWrapperStyles } from './styles';
import { Filter } from './Filter';
import { ColumnsFilter } from './ColumnsFilters';
import { QueryInfo } from './QueryInfo';

export const Toolbar = <T extends object>(props: IToolbarProps<T>) => {
    const {
        query = getInitialQuery(),
        title,
        columns,
        queryData = {}, 
        goBack,
        onChange
    } = props;

    const { filterBy } = query;
    const { globalFilter } = queryData;

    const navigate = useNavigate();

    const handleGoBack = useCallback(() => {
        if (goBack) {
            goBack();
            return;
        }
        navigate(-1);
    }, [navigate, goBack]);

    return (
        <Box>
            <Box sx={toolbarWrapperStyles}>
                <Box sx={titleWrapperStyles}>
                    <IconButton onClick={handleGoBack}>
                        <BackIcon />
                    </IconButton>
                    <Typography variant='h4'>{title}</Typography>
                </Box>
                <Box sx={titleWrapperStyles}>
                    {globalFilter !== undefined && 
                        <Filter
                            fieldFilterData={globalFilter}
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
            <QueryInfo query={query} queryData={queryData} onChange={onChange} />
        </Box>
    );
};

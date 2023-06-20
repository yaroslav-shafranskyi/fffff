import { Fragment, useCallback } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { ArrowBack as BackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { IFilter } from '../../interfaces';

import { IToolbarProps } from './types';
import { titleWrapperStyles, toolbarWrapperStyles } from './styles';
import { Filter } from './Filter';

export const Toolbar = <T extends object>(props: IToolbarProps<T>) => {
    const {
        filterBy,
        title,
        columns,
        globalFilterPlaceholder,
        goBack,
        clearFilter,
        onChange
    } = props;

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

    return (
        <Box sx={toolbarWrapperStyles}>
            <Box sx={titleWrapperStyles}>
                <IconButton onClick={handleGoBack}>
                    <BackIcon />
                </IconButton>
                <Typography variant='h4'>{title}</Typography>
            </Box>
            <Box>
                <Filter
                    filterBy={filterBy}
                    columns={columns}
                    globalFilterPlaceholder={globalFilterPlaceholder}
                    onChange={onChange?.('filterBy') as (value: IFilter) => void}
                />
            </Box>
        </Box>
    );
};

import { Fragment, useCallback } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { Close as ClearIcon } from '@mui/icons-material';

import { IToolbarProps } from './types';
import { filterInfoStyles } from './styles';

export const Toolbar = <T extends object>(props: IToolbarProps<T>) => {
    const { filterBy, columns, clearFilter } = props;

    const getToolbarFilterTitle = useCallback((key: string) => {
        const column = columns.find(col => col.key === key);
        if (!column) {
            return 'Невідоме поле'
        }
        return column.title
    }, [columns]);

    return (
        <Box sx={filterInfoStyles}>
            <Typography>Фільтри: </Typography>
            {Object.keys(filterBy).map(key => (
                <Fragment key={key}>
                    <Typography>{getToolbarFilterTitle(key)}: </Typography>
                    <Typography>{String(filterBy[key])}</Typography>
                    <IconButton onClick={clearFilter(key)}>
                        <ClearIcon />
                    </IconButton>
                </Fragment>
            ))}
        </Box>
    );
};

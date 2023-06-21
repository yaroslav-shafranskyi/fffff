import { useState, MouseEvent, Fragment } from 'react';
import {
    Button,
    Menu,
    Typography,
    IconButton,
    Box,
    Popover
} from '@mui/material';
import { FilterAltOutlined as FilterIcon, Close as CloseIcon } from '@mui/icons-material';

import { IColumnsFiltersProps } from './types';
import {
    columnsFiltersButtonStyles,
    columnsFiltersHeaderStyles,
    filtersMenuStyles,
    filtersPopoverStyles
} from './styles';
import { Filter } from './Filter';

export const ColumnsFilter = <T extends object>(props: IColumnsFiltersProps<T>) => {
    const {
        queryData = {},
        query,
        onChange,
    } = props;

    const { filterBy, sortBy } = query;
    const { filters, sorts } = queryData;

    const [open, setOpen] = useState<boolean>(false);

    const handleOpenMenu = () => {
        setOpen(true);
    };
    const handleCloseMenu = () => {
        setOpen(false);
    };

    return (
        <>
            <Button
                variant='contained'
                color='inherit'
                sx={columnsFiltersButtonStyles}
                onClick={handleOpenMenu}
            >
                ФІЛЬТРИ
                <FilterIcon />
            </Button>
            <Popover
                open={open}
                sx={filtersPopoverStyles}
                anchorOrigin={{
                    horizontal: 'right',
                    vertical: 'top'
                }}
                PaperProps={{
                    sx: filtersMenuStyles
                }}
                onClose={handleCloseMenu}
            >
                <Box sx={columnsFiltersHeaderStyles}>
                    <Typography sx={{ fontWeight: 'bold' }}>
                        Фільтри
                    </Typography>
                    <IconButton onClick={handleCloseMenu}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                {filters !== undefined && (
                    filters.map((filterData) => {
                        const { key, placeholder, title, options, type } = filterData;
                        return (
                            <Box key={key}>
                                {title !== undefined && <Typography>{title}</Typography>}
                                <Filter
                                    fieldFilterData={filterData}
                                    filterBy={filterBy}
                                    onChange={onChange('filterBy')}
                                />
                            </Box>
                        )
                    })
                )}
            </Popover>
        </>
    )
};

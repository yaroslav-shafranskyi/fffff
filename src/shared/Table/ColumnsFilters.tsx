import { useState, MouseEvent, Fragment } from 'react';
import {
    Button,
    Menu,
    Typography,
    IconButton,
    Box,
    Popover,
    Divider
} from '@mui/material';
import { FilterAltOutlined as FilterIcon, Close as CloseIcon } from '@mui/icons-material';

import { IColumnsFiltersProps } from './types';
import {
    columnsFiltersButtonStyles,
    columnsFiltersHeaderStyles,
    filterFieldWrapperStyles,
    filterGroupWrapperStyles,
    filtersMenuStyles,
    filtersPopoverStyles
} from './styles';
import { Filter } from './Filter';
import { Sort } from './Sort';

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
                    <Typography sx={{ fontWeight: 'bold' }} variant='h5'>
                        Фільтри
                    </Typography>
                    <IconButton onClick={handleCloseMenu}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                {filters !== undefined && (
                    (filters).map(({ title: groupTitle, fields }, idx) => (
                        <Fragment key={groupTitle ?? fields[0].key + 'Group'}>
                            <Box sx={filterGroupWrapperStyles}>
                                {groupTitle !== undefined && <Typography variant='h5'>{groupTitle}</Typography>}
                                {fields.map((fieldData) => {
                                    const { key, title } = fieldData;
                                    const sortData = sorts?.[key];
                                    return (
                                        <Box key={key} sx={filterFieldWrapperStyles}>
                                            {title !== undefined && <Typography>{title}</Typography>}
                                            <Filter
                                                fieldFilterData={fieldData}
                                                filterBy={filterBy}
                                                onChange={onChange('filterBy')}
                                            />
                                            {sortData !== undefined && (
                                                <Sort
                                                    field={key as keyof T}
                                                    fieldSortData={sortData}
                                                    sortBy={sortBy}
                                                    onChange={onChange('sortBy')}
                                                />
                                            )}
                                        </Box>
                                    )
                                })}
                            </Box>
                            {idx !== filters.length - 1 && <Divider orientation='horizontal' />}
                        </Fragment>
                    ))
                )}
            </Popover>
        </>
    )
};

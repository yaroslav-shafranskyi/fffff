import { useCallback } from 'react';
import { Box, Checkbox, FormControl, MenuItem, Select, Typography } from '@mui/material';

import { ISortProps } from './types';
import { ISort, SortOrder } from '../../interfaces';
import { sortSelectStyles, sortSelectTitleStyles } from './styles';

export const Sort = <T extends object>({ field, fieldSortData, sortBy, onChange }: ISortProps<T>) => {
    const selected = sortBy?.[field];

    const handleSelectOrder = useCallback((value: SortOrder) => () => {
        onChange({ [field]: value } as ISort<T>);
    }, [field, onChange]);

    return (
        <Box>
            <FormControl fullWidth={true}>
                <Typography sx={sortSelectTitleStyles} color='textSecondary'>
                    Сортувати
                </Typography>
                <Select sx={sortSelectStyles}>
                    {Object.entries(fieldSortData).map(([order, title]) => (
                        <MenuItem
                            key={`${field as string}-${order}`}
                            sx={sortSelectStyles}
                            onClick={handleSelectOrder(order as SortOrder)}
                        >
                            <Checkbox checked={selected === order} />
                            <Typography>{title}</Typography>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

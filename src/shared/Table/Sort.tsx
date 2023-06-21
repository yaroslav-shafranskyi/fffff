import { useCallback } from 'react';
import { Box, Checkbox, FormControl, MenuItem, Select, Typography } from '@mui/material';

import { ISortProps } from './types';
import { ISort, SortOrder } from '../../interfaces';
import { sortSelectStyles, sortSelectTitleStyles } from './styles';

export const Sort = <T extends object>({ field, fieldSortData, sortBy, onChange }: ISortProps<T>) => {
    const selected = sortBy?.[field];

    const handleSelectOrder = useCallback((value: SortOrder) => () => {
        const isSelected = value === selected;
        if (isSelected) {
            onChange(undefined);
        }
        onChange({ [field]: value } as ISort<T>);
    }, [field, onChange, selected]);

    return (
        <Box>
            <FormControl fullWidth={true}>
                <Typography sx={sortSelectTitleStyles} color='textSecondary'>
                    Сортувати
                </Typography>
                <Select sx={sortSelectStyles}>
                    {Object.entries(fieldSortData).map(([order, { optionTitle }]) => (
                        <MenuItem
                            key={`${field as string}-${order}`}
                            sx={sortSelectStyles}
                            onClick={handleSelectOrder(order as SortOrder)}
                        >
                            <Checkbox checked={selected === order} />
                            <Typography>{optionTitle}</Typography>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

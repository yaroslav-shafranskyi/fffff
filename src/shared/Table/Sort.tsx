import { useCallback, useMemo } from 'react';
import { ArrowUpward as SortIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { ISortProps } from './types';
import { ISort, SortOrder } from '../../interfaces';

export const Sort = <T extends object>({ field, sortBy, onChange }: ISortProps<T>) => {
    const order = sortBy?.[field];

    const handleClick = useCallback(() => {
        const newOrder = (order === SortOrder.ASC || !order) ? SortOrder.DESC : SortOrder.ASC;

        onChange({ [field]: newOrder } as ISort<T>);
    }, [field, onChange, order]);

    const iconStyles = useMemo(() => order === SortOrder.DESC ? { transform: 'rotate(180deg)' } : {}, [order]);

    return (
        <IconButton size='small' onClick={handleClick}>
            <SortIcon sx={iconStyles} />
        </IconButton>
    );
};

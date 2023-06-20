import { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react';

import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

import { IFilterProps } from './types';


export const Filter = <T extends object>(props: IFilterProps<T>) => {
    const {
        columns,
        filterBy,
        globalFilterPlaceholder  = 'Почніть вводити значення для пошуку',
        onChange
    } = props;

    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setInputValue(value);
        if (!value) {
            onChange({ ...filterBy, 'Any': '' });
        }
    };

    const handleSubmitGlobalFilter = useCallback(() => {
        onChange({ ...filterBy, 'Any': inputValue });
    }, [filterBy, inputValue, onChange]);

    const handleEnterPress = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSubmitGlobalFilter();
        }
    }, [handleSubmitGlobalFilter])

    return (
        <Box>
            <TextField
                size='small'
                value={inputValue}
                placeholder={globalFilterPlaceholder}
                InputProps={{
                    startAdornment: 
                        <InputAdornment position="start">
                            <IconButton onClick={handleSubmitGlobalFilter}>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                }}
                onChange={handleInputChange}
                onKeyPress={handleEnterPress}
            />
        </Box>
    );
};
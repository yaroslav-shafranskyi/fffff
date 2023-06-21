import { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react';

import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

import { IFilterProps } from './types';


export const Filter = <T extends object>(props: IFilterProps<T>) => {
    const {
        fieldFilterData,
        filterBy,
        onChange
    } = props;

    const { key, title, placeholder } = fieldFilterData;

    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setInputValue(value);
        if (!value) {
            onChange({ ...filterBy, [key]: '' });
        }
    }, [key, filterBy, onChange]);

    const handleSubmitGlobalFilter = useCallback(() => {
        onChange({ ...filterBy, [key]: inputValue });
    }, [filterBy, inputValue, key, onChange]);

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
                placeholder={placeholder ?? title}
                InputProps={{
                    startAdornment: 
                        <InputAdornment position="start">
                            <IconButton onClick={handleSubmitGlobalFilter}>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>,
                    sx: { pl: 0 },
                }}
                onChange={handleInputChange}
                onKeyPress={handleEnterPress}
            />
        </Box>
    );
};
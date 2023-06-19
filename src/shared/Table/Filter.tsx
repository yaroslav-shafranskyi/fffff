import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';

import { Box, IconButton, Input } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

import { IFilterProps } from './types';
import { filterInputStyles } from './styles';


export const Filter = (props: IFilterProps) => {
    const {
        field,
        isFocused,
        setFocused,
        onChange
    } = props;

    const [showInput, setShowInput] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
        if (!isFocused) {
            setShowInput(false);
        }
    }, [isFocused]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSubmitFilter = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') {
            return;
        }
        onChange({ [field]: inputValue });
        setShowInput(false);
        setInputValue('');
    };

    const toggleShowInput = () => {
        setShowInput(prevShow => {
            const result = !prevShow;
            setFocused(result ? field : undefined);
            return result;
        });
    };

    return (
        <Box>
            <IconButton size='small' onClick={toggleShowInput}>
                <SearchIcon />
            </IconButton>
            {showInput && 
                <Input
                    size='small'
                    value={inputValue}
                    sx={filterInputStyles}
                    placeholder='Введіть значення'
                    onChange={handleInputChange}
                    onKeyUp={handleSubmitFilter}
                />
            }
        </Box>
    );
};
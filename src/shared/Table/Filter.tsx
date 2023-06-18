import { ChangeEvent, KeyboardEvent, useState } from 'react';

import { IconButton, Input } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

import { IFilterProps } from './types';


export const Filter = <TData, TValue>({ column }: IFilterProps<TData, TValue>) => {
    const [showInput, setShowInput] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSubmitFilter = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            column.setFilterValue(inputValue);
            setShowInput(false);
        }
    };

    const toggleShowInput = () => {
        setShowInput(prevShow => !prevShow);
    };

    return (
        <>
            <IconButton size='small' onClick={toggleShowInput}>
                <SearchIcon />
            </IconButton>
            {showInput && 
                <Input
                    size='small'
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyUp={handleSubmitFilter}
                />
            }
        </>
    );
};
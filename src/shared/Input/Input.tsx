import { FC } from 'react';
import { TextField, Typography } from '@mui/material';

import { IInputProps } from './types';

export const Input: FC<IInputProps> = (props) => {
    const { error, inputProps } = props;
    return <>
        <TextField 
            variant='standard'
            sx={{ p: 0 }}
            {...props}
            error={error !== undefined} 
            inputProps={{sx: { p: 0 }, ...inputProps }}
        />
        {error && <Typography color='error'>{error}</Typography>}
    </>
}

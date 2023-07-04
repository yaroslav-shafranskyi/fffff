import { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, Typography } from '@mui/material';

import { IForm100 } from '../../../../api';
import { Input } from '../../../../shared';

import { containerStyles, textFieldStyles } from './styles';

export const Stage = () => {
    const { formState, getValues, setValue } = useFormContext<IForm100>();

    const stage = getValues('stage');

    const error = formState.errors.stage?.message;

    const updateStage = (event: ChangeEvent<HTMLInputElement>) => {
        setValue('stage', event.target.value);
    }

    return (
        <Box sx={containerStyles}>
            <Input
                fullWidth={true}
                value={stage ?? ''}
                sx={textFieldStyles}
                error={error}
                inputProps={{
                    sx: { pl: .5, pb: 0 }
                }}
                onChange={updateStage}
            />
            <Typography sx={{ textAlign: 'center' }}>
                Найменування етапу
            </Typography>
        </Box>
    );
};

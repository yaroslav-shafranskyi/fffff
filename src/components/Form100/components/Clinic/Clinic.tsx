import { ChangeEvent } from 'react';
import { Box, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import { Input } from '../../../../shared';

import {
    clinicCaptionWrapperStyles,
    clinicInputPropsSx,
    clinicInputWrapperStyles,
    clinicWrapperStyles,
} from './styles';

export const Clinic = () => {
    const { formState, watch, setValue } = useFormContext();

    const clinic = watch('clinic');

    const error = formState.errors.clinic?.message;

    const hanleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue('clinic', event.target.value);
    }

    return (
        <Box sx={clinicWrapperStyles}>
            <Typography>
                Видана:
            </Typography>
            <Box sx={clinicInputWrapperStyles}>
                <Input
                    value={clinic}
                    fullWidth={true}
                    multiline={true}
                    rows={2}
                    error={error as string}
                    inputProps={{
                        sx: clinicInputPropsSx,
                    }}
                    onChange={hanleInputChange}
                />
            <Box sx={clinicCaptionWrapperStyles}>
                <Typography variant='caption' sx={{ fontSize: '0.4rem' }}>
                    найменування мед. пункту (закладу), або їх штамп
                </Typography>
            </Box>
        </Box>
    </Box>
    )
}
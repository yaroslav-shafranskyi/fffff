import { ChangeEvent } from 'react';
import { Box, Input, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import {
    clinicCaptionWrapperStyles,
    clinicInputPropsSx,
    clinicInputWrapperStyles,
    clinicWrapperStyles,
} from './styles';

export const Clinic = () => {
    const { watch, setValue } = useFormContext();

    const clinic = watch('clinic');

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
                    inputProps={{
                        sx: clinicInputPropsSx,
                    }}
                    onChange={hanleInputChange}
                />
            <Box sx={clinicCaptionWrapperStyles}>
                <Typography variant='caption'>
                    найменування мед. пункту (закладу), або їх штамп
                </Typography>
            </Box>
        </Box>
    </Box>
    )
}
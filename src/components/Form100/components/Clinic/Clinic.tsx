import { ChangeEvent, useCallback, FC } from 'react';
import { Box, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import { Input } from '../../../../shared';
import { IFCPropsWithReadonly } from '../../../../interfaces';

import {
    clinicCaptionWrapperStyles,
    clinicInputPropsSx,
    clinicInputWrapperStyles,
    clinicWrapperStyles,
} from './styles';

export const Clinic: FC<IFCPropsWithReadonly> = ({ readonly }) => {
    const { formState, watch, setValue, clearErrors } = useFormContext();

    const clinic = watch('clinic');

    const error = formState.errors.clinic?.message;

    const hanleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if (readonly) {
            return;
        }
        setValue('clinic', event.target.value);
        clearErrors('clinic');
    }, [clearErrors, readonly, setValue])

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
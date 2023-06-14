import { FC, useState, useEffect, ChangeEvent } from 'react';
import { Box, Input, Typography } from '@mui/material';

import { IClinicProps } from './types';
import {
    clinicCaptionWrapperStyles,
    clinicInputPropsSx,
    clinicInputWrapperStyles,
    clinicWrapperStyles,
} from './styles';

export const Clinic: FC<IClinicProps> = (props) => {
    const { data, onChange } = props;

    const [clinic, setClinic] = useState<string>('');
    useEffect(() => {
        setClinic(data ?? '');
    }, [data]);

    const hanleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const clinic = event.target.value;
        setClinic(clinic);
        onChange?.(clinic);
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
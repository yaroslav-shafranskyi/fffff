import { FC, ChangeEvent, useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

import { Input } from '../../../../shared';

import { IDiagnosisProps } from './types';
import { diagnosisInputStyles, diagnosisStyles, inputPropsStyles } from './styles';

export const Diagnosis: FC<IDiagnosisProps> = (props) => {
    const { data, onChange } = props;

    const [diagnosis, setDiagnosis] = useState<string>('');

    useEffect(() => {
        if (data !== undefined) {
            setDiagnosis(data)
        }
    }, [data])

    const handlChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        onChange?.(value);
        setDiagnosis(value);
    };

    return (
        <Box sx={diagnosisStyles}>
            <Typography sx={{ position: 'absolute'}}>
                Діагноз
            </Typography>
            <Input
                value={diagnosis}
                multiline={true}
                inputProps={{ sx: inputPropsStyles }}
                fullWidth={true}
                sx={diagnosisInputStyles}
                onChange={handlChange}
            />
        </Box>
    )
};

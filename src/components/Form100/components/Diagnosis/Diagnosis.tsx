import { ChangeEvent } from 'react';
import { Box, Typography } from '@mui/material';

import { Input } from '../../../../shared';

import { diagnosisInputStyles, diagnosisStyles, inputPropsStyles, titleWrapperStyles } from './styles';
import { useFormContext } from 'react-hook-form';
import { IForm100 } from '../../../../api';

export const Diagnosis = () => {
    const { formState, watch, setValue } = useFormContext<IForm100>();

    const diagnosis = watch('diagnosis');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue('diagnosis', event.target.value);
    };

    const error = formState.errors?.diagnosis?.message;

    return (
        <Box sx={diagnosisStyles}>
            <Box sx={titleWrapperStyles}>
                <Typography>
                    Діагноз
                </Typography>
            </Box>
            <Box sx={{ width: '100%' }}>
                <Input
                    value={diagnosis}
                    multiline={true}
                    inputProps={{ sx: inputPropsStyles }}
                    fullWidth={true}
                    sx={diagnosisInputStyles}
                    error={error}
                    onChange={handleChange}
                />
            </Box>
        </Box>
    )
};

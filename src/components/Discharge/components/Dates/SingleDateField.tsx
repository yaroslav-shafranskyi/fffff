import { FC } from 'react';
import { Box, Typography } from '@mui/material';

import { CustomDatePicker, Input } from '../../../../shared';
import { convertNullOrNumberToDate, formatDateWithoutDots } from '../../../../helpers';

import { ISingleDateFieldProps } from './types';
import { blankBoxStyles, inputStyles, rowStyles } from './styles';

export const SingleDateField: FC<ISingleDateFieldProps> = (props) => {
    const { title, value, error, onChange } = props;

    return (
        <Box sx={{...rowStyles, alignItems: error ? 'center' : 'end' }}>
            <Typography>{title}</Typography>
            <Box sx={blankBoxStyles} />
            <CustomDatePicker onChange={onChange}>
                <Input
                    value={formatDateWithoutDots(convertNullOrNumberToDate(value)) ?? ''}
                    error={error}
                    sx={inputStyles}
                />
            </CustomDatePicker>
        </Box>
    );
};

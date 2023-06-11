import { FC } from 'react';
import { Box, Typography } from '@mui/material';

import { getDateData } from '../../../../helpers';

import { IForm100DateProps } from './types';

export const Form100Date: FC<IForm100DateProps> = (props) => {
    const date = props.data ?? new Date();

    const { hours: dateHours, minutes: dateMinutes, day: dateDay, monthName: dateMonth, year: dateYear } = getDateData(date);

    return (
        <Box sx={{ textAlign: 'center' }}>
            <Typography>
                {dateHours} год. {dateMinutes} хв. "{dateDay}" {dateMonth} 20{dateYear}р. 
            </Typography>
        </Box>
    )
};

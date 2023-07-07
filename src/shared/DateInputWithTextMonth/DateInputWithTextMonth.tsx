import { FC, useMemo } from 'react';
import { Typography, Box } from '@mui/material';

import { getDateData } from '../../helpers';
import { emptyDateData } from '../../constants';
import { IFCPropsWithReadonly } from '../../interfaces';

import { IDateCalendarProps } from '../DateCalendar';
import { CustomDatePicker } from '../CustomDatePicker';

import { fieldStyles, wrapperStyles } from './styles';

export const DateInputWithTextMonth: FC<IFCPropsWithReadonly<IDateCalendarProps>> = (props) => {
    const { value } = props;
    const { day, monthName, year } = useMemo(() => !value ? emptyDateData : getDateData(value), [value]);

    return (
        <CustomDatePicker {...props}>
            <Box sx={wrapperStyles}>
                "<Box sx={{ ...fieldStyles, minWidth: '16px' }}>
                    <Typography>{day}</Typography>    
                </Box>"
                <Box sx={{ ...fieldStyles, minWidth: '48px' }}>
                    <Typography>{monthName}</Typography>
                </Box>
                    <Typography>20</Typography>
                <Box sx={fieldStyles}>
                    <Typography>{year}</Typography>
                </Box>
                    <Typography>року</Typography>
            </Box>
        </CustomDatePicker>
    );
};

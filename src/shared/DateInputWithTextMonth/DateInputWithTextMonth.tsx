import { FC, useMemo, useState } from 'react';
import { Typography, Dialog, Box } from '@mui/material';

import { getDateData } from '../../helpers';
import { emptyDateData } from '../../constants';

import { DateCalendar } from '../DateCalendar';

import { IDateInputWithTextMonthProps } from './types';
import { fieldStyles, wrapperStyles } from './styles';


export const DateInputWithTextMonth: FC<IDateInputWithTextMonthProps> = (props) => {
    const { value } = props;

    const [open, setOpen] = useState<boolean>(false);

    const { day, monthName, year } = useMemo(() => !value ? emptyDateData : getDateData(value), [value]);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <Box sx={wrapperStyles} onClick={handleOpen}>
                "<Box sx={fieldStyles}>
                    <Typography>{day}</Typography>    
                </Box>"
                <Box sx={fieldStyles}>
                    <Typography>{monthName}</Typography>
                </Box>
                    <Typography>20</Typography>
                <Box sx={fieldStyles}>
                    <Typography>{year}</Typography>
                </Box>
                    <Typography>року</Typography>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DateCalendar { ...props } />
            </Dialog>
        </>
    );
};

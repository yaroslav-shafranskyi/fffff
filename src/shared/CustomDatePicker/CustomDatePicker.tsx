import { FC, useCallback, useState } from 'react';
import { Dialog, Box } from '@mui/material';

import { DateCalendar } from '../DateCalendar';

import { ICustomDatePickerProps } from './types';

export const CustomDatePicker: FC<ICustomDatePickerProps> = ({ children, onChange, ...props }) => {
    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = useCallback((date?: Date) => {
        onChange(date);
        setOpen(false);
    }, [onChange])

    return (
        <>
            <Box sx={{ cursor: 'pointer' }} onClick={handleOpen} onKeyPress={handleOpen}>
                {children}
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DateCalendar { ...props } onChange={handleChange} />
            </Dialog>
        </>
    );
};

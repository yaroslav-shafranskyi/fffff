import { FC, useCallback, useState } from 'react';
import { Box, Dialog, Typography } from '@mui/material';

import { DateCalendar, Input } from '../../../../shared';
import { formatDateWithoutDots } from '../../../../helpers';

import { ISingleDateFieldProps } from './types';
import { blankBoxStyles, inputStyles, rowStyles } from './styles';

export const SingleDateField: FC<ISingleDateFieldProps> = (props) => {
    const { title, value, error, onChange } = props;

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
    }, [onChange]);

    return (
        <Box sx={rowStyles}>
                <Typography>{title}</Typography>
                <Box sx={blankBoxStyles} />
                <Box>
                    <Input
                        value={formatDateWithoutDots(value)}
                        onClick={handleOpen}
                        error={error}
                        sx={inputStyles}
                    />
                </Box>
            <Dialog open={open} onClose={handleClose}>
                <DateCalendar onChange={handleChange} />
            </Dialog>
        </Box>
    );
};
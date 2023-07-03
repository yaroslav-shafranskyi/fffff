import { FC, useCallback, useMemo, useState } from 'react';
import { Box, Dialog, Typography } from '@mui/material';

import { getDateData } from '../../helpers';
import { emptyDateData } from '../../constants';

import { Input } from '../Input';
import { DateTimePicker } from '../DateTimePicker';

import { IDateInputWithSeparatedFieldsProps } from './types';
import { dateNumberInputStyles, wrapperStyles } from './styles';

export const DateInputWithSeparatedFields: FC<IDateInputWithSeparatedFieldsProps> = (props) => {
    const { date, onChange } = props;

    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = useCallback((d?: Date) => {
        if (!d) {
            return;
        }
        onChange(d);
    }, [onChange]);

    const { hours, minutes, day, month, year } = useMemo(() => !date ? emptyDateData : getDateData(date), [date]);

    return (
        <>
            <Box sx={wrapperStyles} onClick={handleOpen}>
                <Input value={hours} sx={dateNumberInputStyles} /> 
                <Typography>год.</Typography>
                <Input value={minutes} sx={dateNumberInputStyles} />
                <Typography>{`хв. `}</Typography>
                <Input value={day} sx={dateNumberInputStyles} />. 
                <Input value={month} sx={dateNumberInputStyles} />.
                <Typography>20</Typography>
                <Input value={year} sx={dateNumberInputStyles} />
                <Typography>р.</Typography>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DateTimePicker
                    value={date}
                    onChange={handleChange}
                    onAccept={handleClose}
                />
            </Dialog>
        </>
    );
};

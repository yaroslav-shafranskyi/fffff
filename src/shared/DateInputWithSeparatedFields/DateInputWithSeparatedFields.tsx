import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

import { getDateData, updateDay, updateMinute, updateMonth, updateYear } from '../../helpers';
import { emptyDateData } from '../../constants';

import { Input } from '../Input';

import { IDateInputWithSeparatedFieldsProps } from './types';
import { dateNumberInputStyles, wrapperStyles } from './styles';

export const DateInputWithSeparatedFields: FC<IDateInputWithSeparatedFieldsProps> = (props) => {
    const { date, onChange } = props;

    const [updatedDate, setUpdatedDate] = useState<Date>()

    const { hours, minutes, day, month, year } = updatedDate ?  getDateData(updatedDate) : emptyDateData;

    useEffect(() => {
        if (updatedDate?.toString() === date?.toString()) {
            return;
        }
        setUpdatedDate(date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date])

    const handleHoursChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const nHours = +event.target.value;
        if (Number.isNaN(nHours)) {
            return;
        }
        const nDate = updatedDate ?? new Date();
        if (!updatedDate) {
            nDate.setMinutes(0);
        }
        if (nHours > new Date().getHours()) {
            nDate.setDate(nDate.getDate() - 1);
        }
        nDate.setHours(nHours);
        onChange(nDate);
    }, [onChange, updatedDate]);

    const handleCommonFieldChange = useCallback((updator: (d: Date, v: number) => void) => 
        (event: ChangeEvent<HTMLInputElement>) => {
            const nValue = +event.target.value;
            if (Number.isNaN(nValue)) {
                return;
            }
            const nDate = updatedDate ?? new Date();
            updator(nDate, nValue);
            onChange(nDate);
    }, [onChange, updatedDate]);

    return (
        <Box sx={wrapperStyles}>
            <Input value={hours} onChange={handleHoursChange} sx={dateNumberInputStyles} /> 
            <Typography>год.</Typography>
            <Input value={minutes} onChange={handleCommonFieldChange(updateMinute)} sx={dateNumberInputStyles} />
            <Typography>{`хв. `}</Typography>
            <Input value={day} onChange={handleCommonFieldChange(updateDay)} sx={dateNumberInputStyles} />. 
            <Input value={month} onChange={handleCommonFieldChange(updateMonth)} sx={dateNumberInputStyles} />.
            <Typography>20</Typography>
            <Input value={year} onChange={handleCommonFieldChange(updateYear(true))} sx={dateNumberInputStyles} />
            <Typography>р.</Typography> 
        </Box>
    );
};

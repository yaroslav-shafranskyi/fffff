import { FC, useCallback, useEffect, useState } from 'react';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar as MuiDateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DateTime } from 'luxon';

import { IDateCalendarProps } from './types';

export const DateCalendar: FC<IDateCalendarProps> = ({ value, onChange, ...restProps }) => {
    const [dateTimeValue, setDateTimeValue] = useState<DateTime | null>(null);

    useEffect(() => {
        if (value !== undefined) {
            setDateTimeValue(DateTime.fromJSDate(value))
        return;
        }
            setDateTimeValue(null);
    }, [value]);

    const handleChange = useCallback((dateTime: DateTime | null) => {
        if (dateTime !== null) {
            onChange(dateTime.toJSDate());
            return;
        }
        onChange(undefined);
    }, [onChange]);

    return (
        <LocalizationProvider adapterLocale='ua' dateAdapter={AdapterLuxon}>
            <MuiDateCalendar { ...restProps } value={dateTimeValue} onChange={handleChange} />
        </LocalizationProvider>
    );
};

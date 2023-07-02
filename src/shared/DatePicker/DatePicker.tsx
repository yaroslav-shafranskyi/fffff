import { FC, useCallback, useEffect, useState } from 'react';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTime } from 'luxon';

import { IDatePickerProps } from './types';

export const DatePicker: FC<IDatePickerProps> = (props) => {
    const { value, onChange } = props;

    const [pickerValue, setPickerValue] = useState<DateTime | null>(null);

    useEffect(() => {
        if (value !== undefined) {
            setPickerValue(DateTime.fromJSDate(value))
            return;
        }
        setPickerValue(null);
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
            <MuiDatePicker { ...props } value={pickerValue} onChange={handleChange} />
        </LocalizationProvider>
    );
};

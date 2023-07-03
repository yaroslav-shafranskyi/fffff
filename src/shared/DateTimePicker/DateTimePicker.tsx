import { FC, useCallback, useEffect, useState } from 'react';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import { DateTime } from 'luxon';

import { IDateTimePickerProps } from './types';

export const DateTimePicker: FC<IDateTimePickerProps> = (props) => {
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
        <LocalizationProvider adapterLocale='uk-UA' dateAdapter={AdapterLuxon}>
            <StaticDateTimePicker { ...props } value={pickerValue} onChange={handleChange} />
        </LocalizationProvider>
    );
};

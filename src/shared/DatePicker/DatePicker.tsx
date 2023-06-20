import { FC } from 'react';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MuiDatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { DateTime } from 'luxon';

export const DatePicker: FC<DatePickerProps<DateTime>> = (props) => {
    return (
        <LocalizationProvider adapterLocale='ua' dateAdapter={AdapterLuxon}>
            <MuiDatePicker { ...props } />
        </LocalizationProvider>
    );
};

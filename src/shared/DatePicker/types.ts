import { DatePickerProps } from '@mui/x-date-pickers';
import { DateTime } from 'luxon';

export interface IDatePickerProps extends Omit<DatePickerProps<DateTime>, 'value' | 'onChange'> {
    value?: Date;
    onChange: (date?: Date) => void;
}

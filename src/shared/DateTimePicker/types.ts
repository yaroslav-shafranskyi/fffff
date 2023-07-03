import { StaticDateTimePickerProps } from '@mui/x-date-pickers';
import { DateTime } from 'luxon';

export interface IDateTimePickerProps extends Omit<StaticDateTimePickerProps<DateTime>, 'value' | 'onChange'> {
    value?: Date;
    onChange: (date?: Date) => void;
}
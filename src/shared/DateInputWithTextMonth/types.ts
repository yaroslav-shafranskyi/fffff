import { DateCalendarProps } from "@mui/x-date-pickers";
import { DateTime } from "luxon";

export interface IDateInputWithTextMonthProps extends Omit<DateCalendarProps<DateTime>, 'value' | 'onChange'> {
    value?: Date;
    onChange: (date?: Date) => void;
}

import { DateCalendarProps } from "@mui/x-date-pickers";
import { DateTime } from "luxon";

export interface IDateCalendarProps extends Omit<DateCalendarProps<DateTime>, 'value' | 'onChange'> {
    value?: Date;
    onChange: (newValue?: Date) => void;
}

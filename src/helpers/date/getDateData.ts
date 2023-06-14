import { IDateData } from "../../interfaces";
import { monthNames } from "../../constants";

import { convertDateField } from "./convertDay";

export const getDateData = (date: Date): IDateData => ({
    hours: convertDateField(date.getHours()),
    minutes: convertDateField(date.getMinutes()),
    day: convertDateField(date.getDate()),
    month: convertDateField(date.getMonth() + 1),
    monthName: monthNames[date.getMonth()],
    year: convertDateField(date.getFullYear() % 2000),
});

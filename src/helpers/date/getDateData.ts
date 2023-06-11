import { IDateData } from "../../interfaces";
import { monthNames } from "../../constants";

export const getDateData = (date: Date): IDateData => ({
    hours: date.getHours(),
    minutes: date.getMinutes(),
    day: date.getDate(),
    month: date.getMonth(),
    monthName: monthNames[date.getMonth() + 1],
    year: date.getFullYear() % 2000,
});

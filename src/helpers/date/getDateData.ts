import { IDateData } from "../../interfaces";
import { monthNames } from "../../constants";

import { convertDateField } from "./convertDay";

export const getDateData = (date: Date): IDateData => {
  const fullYear = date.getFullYear();
  const year =
    fullYear >= 2000
      ? convertDateField(fullYear % 2000)
      : convertDateField(fullYear % 1900);
  return {
    hours: convertDateField(date.getHours()),
    minutes: convertDateField(date.getMinutes()),
    day: convertDateField(date.getDate()),
    month: convertDateField(date.getMonth() + 1),
    monthName: monthNames[date.getMonth()],
    year,
  };
};

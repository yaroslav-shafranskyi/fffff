export const convertDateField = (date: number) => date < 10 ? `0${date}` : String(date);

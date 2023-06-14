export const updateHour = (d: Date, v: number) => {
    d.setHours(v);
};
export const updateMinute = (d: Date, v: number) => {
    d.setMinutes(v);
};
export const updateDay = (d: Date, v: number) => {
    d.setDate(v);
};
export const updateMonth = (d: Date, v: number) => {
    d.setMonth(v);
};
export const updateYear = (isShortYearFormat = false) => (d: Date, v: number) => {
    const newYear = isShortYearFormat ? v : v + 2000;
    d.setFullYear(newYear);
};

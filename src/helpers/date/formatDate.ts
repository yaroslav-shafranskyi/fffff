import { getDateData } from "."

export const formatDate = (date?: Date, text?: boolean): string => {
    if (!date) {
        return ''
    }
    const { day, month, monthName, year } = getDateData(date);

    if (text) {
        return `${day} ${monthName} 20${year}`;
    }

    return `${day}.${month}.${year}`;
};

export const formatDateWithoutDots = (date?: Date): string => {
    if (!date) {
        return '';
    }
    const { day, month, year } = getDateData(date);
    return `${day}${month}${year}`;
};

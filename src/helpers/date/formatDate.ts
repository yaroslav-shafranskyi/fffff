import { getDateData } from "."

export const formatDate = (date?: Date): string => {
    if (!date) {
        return ''
    }
    const { day, month, year } = getDateData(date);

    return `${day}.${month}.${year}`;
};

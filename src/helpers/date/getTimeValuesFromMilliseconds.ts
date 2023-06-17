export const getHoursFromMilliseconds = (milliseconds: number) => Math.floor(milliseconds / (60 * 60 * 1000));

export const getAllMinutesFromMilliseconds = (milliseconds: number) => Math.floor(milliseconds / (60 * 1000));

export const getRestMinutesFromMilliseconds = (milliseconds: number) => getAllMinutesFromMilliseconds(Math.floor(milliseconds % (60 * 60 * 1000)));

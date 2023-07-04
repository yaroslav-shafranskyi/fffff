export const converStringOrUndefinedToDateOrUndefined = (s?: string | null): Date | undefined => {
    if (!s) {
        return;
    }
    const date = new Date(s);
    if (!Number.isNaN(date.getTime())) {
        return date;
    }
};

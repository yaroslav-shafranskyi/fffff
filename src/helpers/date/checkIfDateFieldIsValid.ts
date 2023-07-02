export const checkIfFieldValueIsValid = (val?: string, isYear = false) => {
    const commonCheck = val !== undefined && !Number.isNaN(+val) && val.length > 0;
    if (isYear) {
        return commonCheck && (val.length === 2 || val.length === 4);
    }
    return commonCheck && val.length <=2;
};

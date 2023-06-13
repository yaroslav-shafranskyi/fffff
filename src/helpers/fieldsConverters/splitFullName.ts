import { NamesDataType } from "../../interfaces"

const emptyNames: NamesDataType = {
    firstName: '',
    secondName: '',
    lastName: '',
};

export const splitFullName = (fullName: string, errorMsg?: string): NamesDataType  => {
    const splittedFullName = fullName.split(' ').map(name => name.trim());
    const shouldHasError = splittedFullName.length !== 3;
    if (shouldHasError) {
        return {
            ...emptyNames,
            error: errorMsg ?? 'Неправильний формат імені'
        }
    }
    const [firstName, secondName, lastName] = splittedFullName;
    return { firstName, secondName, lastName }
};

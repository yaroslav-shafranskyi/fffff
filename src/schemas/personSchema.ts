import { string, object, array, addMethod } from 'yup';

import { defaultDateSchema, defaultStringSchema, fieldRequiredStringSchema } from './constants';

addMethod(string, 'validateFullName', function() {
    return this.test('full-name', 'Неправильний формат імені', (value) => {
        if (!value) {
            return false;
        }
        const splittedValue = value.split(' ');
        const isLengthValid = splittedValue.length === 3;
        const areElementsValid = !splittedValue.some(el => el.length < 3);
        return isLengthValid && areElementsValid;
    })
});

const defaultPersonSchemaFields = {
    id: defaultStringSchema,
    // @ts-expect-error custom method
    fullName: fieldRequiredStringSchema().validateFullName(),
    tokenNumber: defaultStringSchema,
    rank: fieldRequiredStringSchema(),
    gender: fieldRequiredStringSchema(),
    militaryBase: fieldRequiredStringSchema(),
    records: array().of(object().shape({
        type: fieldRequiredStringSchema(),
        date: defaultDateSchema,
        author: defaultStringSchema,
        resume: defaultStringSchema,
    })),
};

export const personForm100Schema = object().shape({
    ...defaultPersonSchemaFields,
    lastRecord: object().shape({
    date: defaultDateSchema,
    }).required(),
}).required();

export const personPageSchema = object().shape({
    ...defaultPersonSchemaFields,
    birthDate: defaultDateSchema,
}).required();

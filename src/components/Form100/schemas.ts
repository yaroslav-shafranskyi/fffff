import { string, object, date, array, number, StringSchema, lazy, addMethod } from 'yup';

import { IPlait } from '../../api';

export const REQUIRED_FIELD_MESSAGE = `Обов'язкове поле`;
export const MIN_3_SYMBOLS_MESSAGE = 'Це поле не може бути меншим, ніж 3 символи';
export const INVALID_DATA_MESSAGE = 'Некоректні дані';

export const fieldRequiredStringSchema = (schema: StringSchema) => schema.required(REQUIRED_FIELD_MESSAGE);
export const min3SymbolsStringSchema = (schema: StringSchema) => schema.min(3, MIN_3_SYMBOLS_MESSAGE);

export const defaultStringSchema = fieldRequiredStringSchema(min3SymbolsStringSchema(string()));
export const defaultDateSchema = date().required(REQUIRED_FIELD_MESSAGE);

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
})

export const personSchema = object().shape({
    id: defaultStringSchema,
    // @ts-expect-error custom method
    fullName: string().required(REQUIRED_FIELD_MESSAGE).validateFullName(),
    tokenNumber: defaultStringSchema,
    rank: string().required(REQUIRED_FIELD_MESSAGE),
    gender: string().required(REQUIRED_FIELD_MESSAGE),
    militaryBase: string().required(REQUIRED_FIELD_MESSAGE),
    records: array().of(object().shape({
        type: string().required(REQUIRED_FIELD_MESSAGE),
        date: defaultDateSchema,
        author: defaultStringSchema,
        resume: defaultStringSchema,
    })),
    lastRecord: object().shape({
        date: defaultDateSchema
    }).required(),
}).required();

export const evacuationSchema = object().shape({
    type: string().required(REQUIRED_FIELD_MESSAGE),
    clinic: defaultStringSchema,
    priority: string().required(REQUIRED_FIELD_MESSAGE),
}).required();

export const plaitSchema = lazy((value?: IPlait) => {
    if (!value?.status) {
        return object().notRequired()
    }
    return object().shape({
        date: date().required('Час не вказаний!')
    }).required()
});

export const form100FrontSchema = object().shape({
    clinic: string().required(REQUIRED_FIELD_MESSAGE),
    person: personSchema,
    date: defaultDateSchema,
    reason: string().required(REQUIRED_FIELD_MESSAGE),
    evacuation: evacuationSchema,
    diagnosis: defaultStringSchema,
    plait: plaitSchema,
    sanitaryTreatment: string().required(REQUIRED_FIELD_MESSAGE),
});

export const form100BackSchema = object().shape({
    date: defaultDateSchema,
    stage: defaultStringSchema,
    fullDiagnosis: defaultStringSchema,
    treatmentInfo: defaultStringSchema,
    fullEvacuationInfo: defaultStringSchema,
    result: defaultStringSchema,
    timeAfterAccident: number().required(),
    firstAidInfo: defaultStringSchema
}).required();

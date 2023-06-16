import { string, object, date, array, number, StringSchema } from 'yup';

export const REQUIRED_FIELD_MESSAGE = `Це поле обов'язкове для заповнення`;
export const MIN_3_SYMBOLS_MESSAGE = 'Це поле не може бути меншим, ніж 3 символи';
export const INVALID_DATA_MESSAGE = 'Некоректні дані';

export const fieldRequiredStringSchema = (schema: StringSchema) => schema.required(REQUIRED_FIELD_MESSAGE);
export const min3SymbolsStringSchema = (schema: StringSchema) => schema.min(3, MIN_3_SYMBOLS_MESSAGE);

export const defaultStringSchema = fieldRequiredStringSchema(min3SymbolsStringSchema(string()));
export const defaultDateSchema = date().required(REQUIRED_FIELD_MESSAGE);

export const personSchema = object().shape({
    id: defaultStringSchema,
    firstName: defaultStringSchema,
    secondName: defaultStringSchema,
    lastName: defaultStringSchema,
    tokenNumber: defaultStringSchema,
    birthDate: defaultDateSchema,
    rank: defaultStringSchema,
    gender: defaultStringSchema,
    militaryBase: defaultStringSchema,
    records: array().of(object().shape({
        type: defaultStringSchema,
        date: defaultDateSchema,
        author: defaultStringSchema,
        resume: defaultStringSchema,
    }))
}).required();

export const evacuationSchema = object().shape({
    type: defaultStringSchema,
    clinic: defaultStringSchema,
    priority: defaultStringSchema,
    transport: defaultStringSchema
}).required();

export const form100FrontSchema = object().shape({
    author: defaultStringSchema,
    person: personSchema,
    date: defaultDateSchema,
    reason: defaultStringSchema,
    evacuation: evacuationSchema,
    diagnosis: defaultStringSchema,
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

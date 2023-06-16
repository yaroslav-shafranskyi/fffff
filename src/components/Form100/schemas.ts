import { string, object, date, array, number, StringSchema } from 'yup';

export const REQUIRED_FIELD_MESSAGE = `Обов'язкове поле`;
export const MIN_3_SYMBOLS_MESSAGE = 'Це поле не може бути меншим, ніж 3 символи';
export const INVALID_DATA_MESSAGE = 'Некоректні дані';

export const fieldRequiredStringSchema = (schema: StringSchema) => schema.required(REQUIRED_FIELD_MESSAGE);
export const min3SymbolsStringSchema = (schema: StringSchema) => schema.min(3, MIN_3_SYMBOLS_MESSAGE);

export const defaultStringSchema = fieldRequiredStringSchema(min3SymbolsStringSchema(string()));
export const defaultDateSchema = date().required(REQUIRED_FIELD_MESSAGE);

export const personSchema = object().shape({
    id: defaultStringSchema,
    fullName: defaultStringSchema,
    tokenNumber: defaultStringSchema,
    birthDate: defaultDateSchema,
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
    type: defaultStringSchema,
    clinic: defaultStringSchema,
    priority: defaultStringSchema,
    transport: defaultStringSchema
}).required();

export const form100FrontSchema = object().shape({
    author: defaultStringSchema,
    person: personSchema,
    date: defaultDateSchema,
    reason: string().required(REQUIRED_FIELD_MESSAGE),
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

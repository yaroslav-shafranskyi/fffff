import { object } from 'yup';

import { defaultDateSchema, defaultStringSchema, fieldRequiredStringSchema, personFullNameSchema } from '../../schemas';

export const dischargeFrontPageSchema = object().shape({
    person: object().shape({
        fullName: personFullNameSchema,
        birthDate: defaultDateSchema,
        address: object().shape({
            oblast: defaultStringSchema,
            region: defaultStringSchema,
            settlement: defaultStringSchema,
            building: fieldRequiredStringSchema(),
            street: defaultStringSchema,
        }).required(),
    }).required(),
    order: object().shape({
        date: defaultDateSchema,
        number: fieldRequiredStringSchema(),
    }).required(),
    receiver: defaultStringSchema,
    datesData: object().shape({
        sick: defaultDateSchema,
        referral: defaultDateSchema,
        arrival: defaultDateSchema,
        leaving: defaultDateSchema,
    }).required(),
    reason: defaultStringSchema,
    fullDiagnosis: defaultStringSchema,
    code: fieldRequiredStringSchema(),
    department: defaultStringSchema,
    clinic: defaultStringSchema,
}).required();

export const dischargeBackPageSchema = object().shape({
    doctor: defaultStringSchema,
    date: defaultDateSchema,
    recommendations: defaultStringSchema,
    info: defaultStringSchema,
}).required();

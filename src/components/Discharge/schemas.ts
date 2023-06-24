import { object } from 'yup';

import { defaultDateSchema, defaultStringSchema, personFullNameSchema } from '../../schemas';

export const dischargeFrontPageSchema = object().shape({
    person: object().shape({
        fullName: personFullNameSchema,
        birthDate: defaultDateSchema,
        address: object().shape({
            oblast: defaultStringSchema,
            region: defaultStringSchema,
            settlement: defaultStringSchema,
            building: defaultStringSchema,
            street: defaultStringSchema,
        }).required(),
    }).required(),
    order: object().shape({
        date: defaultDateSchema,
        number: defaultStringSchema,
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
    code: defaultStringSchema,
    department: defaultStringSchema,
    clinic: defaultStringSchema,
}).required();

export const dischargeBackPageSchema = object().shape({
    doctor: defaultStringSchema,
    date: defaultDateSchema,
    recommendations: defaultStringSchema,
    info: defaultStringSchema,
}).required();

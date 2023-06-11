import { object } from 'yup';

import { defaultStringSchema, defaultDateSchema } from '../../schemas';

export const counterfoilFrontSchema = object().shape({
    date: defaultDateSchema,
    rank: defaultStringSchema,
    militaryBase: defaultStringSchema,
    personFullName: defaultStringSchema,
    id: defaultStringSchema,
    tokenNumber: defaultStringSchema,
    reason: defaultStringSchema,
    newRecordDate: defaultDateSchema,
    evacuation: object().shape({
        clinic: defaultStringSchema,
        transport: defaultStringSchema
    }).required(),
});

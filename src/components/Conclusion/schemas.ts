import { object, string } from 'yup';

import { REQUIRED_FIELD_MESSAGE, defaultDateSchema, defaultStringSchema, personFullNameSchema } from '../../schemas';

export const conclusionSchema = object().shape({
    person: object().shape({
        fullName: personFullNameSchema,
        birthDate: defaultDateSchema,
    }).required(),
    department: defaultStringSchema,
    clinic: defaultStringSchema,
    code: string().required(REQUIRED_FIELD_MESSAGE),
    order: object().shape({
        date: defaultDateSchema,
        number: string().required(REQUIRED_FIELD_MESSAGE),
    }).required(),
    sender: defaultStringSchema,
    doctor: defaultStringSchema,
    diagnosis: defaultStringSchema,
    date: defaultDateSchema,
    headOfTheClinic: defaultStringSchema,
}).required();

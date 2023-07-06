import { object, string } from 'yup';

import { REQUIRED_FIELD_MESSAGE, defaultNumberSchema, defaultStringSchema, personFullNameSchema } from '../../schemas';

export const conclusionSchema = object().shape({
    person: object().shape({
        fullName: personFullNameSchema,
        birthDate: defaultNumberSchema,
    }).required(),
    department: defaultStringSchema,
    clinic: defaultStringSchema,
    code: string().required(REQUIRED_FIELD_MESSAGE),
    order: object().shape({
        date: defaultNumberSchema,
        number: string().required(REQUIRED_FIELD_MESSAGE),
    }).required(),
    sender: defaultStringSchema,
    doctor: defaultStringSchema,
    diagnosis: defaultStringSchema,
    date: defaultNumberSchema,
    headOfTheClinic: defaultStringSchema,
}).required();

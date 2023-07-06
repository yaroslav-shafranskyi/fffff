import { object, string } from 'yup';

import { defaultNumberSchema, defaultStringSchema, personFullNameSchema, REQUIRED_FIELD_MESSAGE } from '../../schemas';

export const rankWithNameSchema = object().shape({
    position: defaultStringSchema,
    fullName: defaultStringSchema,
})

export const referralSchema = object().shape({
    militaryBase: defaultStringSchema,
    code: string().required(REQUIRED_FIELD_MESSAGE),
    date: defaultNumberSchema,
    militaryBaseAddress: defaultStringSchema,
    number: string().required(REQUIRED_FIELD_MESSAGE),
    receiver: defaultStringSchema,
    patient: personFullNameSchema,
    diagnosis: defaultStringSchema,
    commander: rankWithNameSchema,
    medicalCommander: rankWithNameSchema, 
}).required();

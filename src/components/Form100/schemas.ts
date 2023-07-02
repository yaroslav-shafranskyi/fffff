import { object, date, array, lazy, number } from 'yup';

import { IPlait } from '../../api';
import {
    REQUIRED_FIELD_MESSAGE,
    defaultDateSchema,
    defaultStringSchema,
    fieldRequiredStringSchema,
    personForm100Schema
} from '../../schemas';

export const evacuationSchema = object().shape({
    type: fieldRequiredStringSchema(),
    clinic: array().min(1, REQUIRED_FIELD_MESSAGE),
    priority: fieldRequiredStringSchema(),
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
    clinic: fieldRequiredStringSchema(),
    person: personForm100Schema,
    date: defaultDateSchema,
    reason: fieldRequiredStringSchema(),
    evacuation: evacuationSchema,
    diagnosis: defaultStringSchema,
    plait: plaitSchema,
    sanitaryTreatment: fieldRequiredStringSchema(),
});

export const form100BackSchema = object().shape({
    date: defaultDateSchema,
    stage: fieldRequiredStringSchema(),
    fullDiagnosis: defaultStringSchema,
    treatmentInfo: defaultStringSchema,
    fullEvacuationInfo: defaultStringSchema,
    result: defaultStringSchema,
    timeAfterAccident: number().required(),
    firstAidInfo: defaultStringSchema
}).required();

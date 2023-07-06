import { object } from "yup";

import {
  defaultlNumberSchema,
  defaultStringSchema,
  fieldRequiredStringSchema,
  personFullNameSchema,
} from "../../schemas";

export const dischargeFrontPageSchema = object()
  .shape({
    person: object()
      .shape({
        fullName: personFullNameSchema,
        birthDate: defaultlNumberSchema,
        address: object()
          .shape({
            oblast: defaultStringSchema,
            region: defaultStringSchema,
            settlement: defaultStringSchema,
            building: fieldRequiredStringSchema(),
            street: defaultStringSchema,
          })
          .required(),
      })
      .required(),
    order: object()
      .shape({
        date: defaultlNumberSchema,
        number: fieldRequiredStringSchema(),
      })
      .required(),
    receiver: defaultStringSchema,
    datesData: object()
      .shape({
        sick: defaultlNumberSchema,
        referral: defaultlNumberSchema,
        arrival: defaultlNumberSchema,
        leaving: defaultlNumberSchema,
      })
      .required(),
    reason: defaultStringSchema,
    fullDiagnosis: defaultStringSchema,
    code: fieldRequiredStringSchema(),
    department: defaultStringSchema,
    clinic: defaultStringSchema,
  })
  .required();

export const dischargeBackPageSchema = object()
  .shape({
    doctor: defaultStringSchema,
    date: defaultlNumberSchema,
    recommendations: defaultStringSchema,
    info: defaultStringSchema,
  })
  .required();

import { object } from "yup";

import {
  defaultNumberSchema,
  defaultStringSchema,
  fieldRequiredStringSchema,
  personFullNameSchema,
} from "../../schemas";

export const dischargeFrontPageSchema = object()
  .shape({
    person: object()
      .shape({
        fullName: personFullNameSchema,
        birthDate: defaultNumberSchema,
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
        date: defaultNumberSchema,
        number: fieldRequiredStringSchema(),
      })
      .required(),
    receiver: defaultStringSchema,
    datesData: object()
      .shape({
        sick: defaultNumberSchema,
        referral: defaultNumberSchema,
        arrival: defaultNumberSchema,
        leaving: defaultNumberSchema,
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
    date: defaultNumberSchema,
    recommendations: defaultStringSchema,
    info: defaultStringSchema,
  })
  .required();

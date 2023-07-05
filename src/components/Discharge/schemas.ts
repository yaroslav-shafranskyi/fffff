import { object } from "yup";

import {
  defautlNumberSchema,
  defaultStringSchema,
  fieldRequiredStringSchema,
  personFullNameSchema,
} from "../../schemas";

export const dischargeFrontPageSchema = object()
  .shape({
    person: object()
      .shape({
        fullName: personFullNameSchema,
        birthDate: defautlNumberSchema,
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
        date: defautlNumberSchema,
        number: fieldRequiredStringSchema(),
      })
      .required(),
    receiver: defaultStringSchema,
    datesData: object()
      .shape({
        sick: defautlNumberSchema,
        referral: defautlNumberSchema,
        arrival: defautlNumberSchema,
        leaving: defautlNumberSchema,
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
    date: defautlNumberSchema,
    recommendations: defaultStringSchema,
    info: defaultStringSchema,
  })
  .required();

import { string, object, addMethod } from "yup";

import {
  defaultlNumberSchema,
  defaultStringSchema,
  fieldRequiredStringSchema,
} from "./constants";

addMethod(string, "validateFullName", function () {
  return this.test("full-name", "Неправильний формат імені", (value) => {
    if (!value) {
      return false;
    }
    const splittedValue = value.split(" ");
    const isLengthValid = splittedValue.length === 3;
    const areElementsValid = !splittedValue.some((el) => el.length < 3);
    return isLengthValid && areElementsValid;
  });
});

export const personFullNameSchema =
  // @ts-expect-error custom method
  fieldRequiredStringSchema().validateFullName();

const defaultPersonSchemaFields = {
  fullName: personFullNameSchema,
  tokenNumber: defaultStringSchema,
  rank: fieldRequiredStringSchema(),
  gender: fieldRequiredStringSchema(),
  militaryBase: fieldRequiredStringSchema(),
};

export const personForm100Schema = object()
  .shape({
    ...defaultPersonSchemaFields,
    personalId: defaultStringSchema,
  })
  .required();

export const personPageSchema = object()
  .shape({
    ...defaultPersonSchemaFields,
    birthDate: defaultlNumberSchema,
  })
  .required();

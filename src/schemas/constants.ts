import { StringSchema, date, string } from "yup";

export const REQUIRED_FIELD_MESSAGE = `Обов'язкове поле`;
export const MIN_3_SYMBOLS_MESSAGE = 'Це поле не може бути меншим, ніж 3 символи';
export const INVALID_DATA_MESSAGE = 'Некоректні дані';

export const fieldRequiredStringSchema = (schema: StringSchema = string()) => schema.required(REQUIRED_FIELD_MESSAGE);
export const min3SymbolsStringSchema = (schema: StringSchema = string()) => schema.min(3, MIN_3_SYMBOLS_MESSAGE);

export const defaultStringSchema = min3SymbolsStringSchema(fieldRequiredStringSchema());
export const defaultDateSchema = date().required(REQUIRED_FIELD_MESSAGE);

export type MappingFieldsTypes<T> = Record<number, { fieldName: keyof T; name: string; }>

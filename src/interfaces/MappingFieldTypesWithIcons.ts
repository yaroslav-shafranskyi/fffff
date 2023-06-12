export type MappingFieldTypesWithIcons<T> = Record<number, {
    name: string;
    icon: JSX.Element;
    fieldName: keyof T;
}>

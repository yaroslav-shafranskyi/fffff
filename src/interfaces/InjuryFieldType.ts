import { IInjury } from "../api";

export type InjuryFieldType = Record<number, {
    name: string;
    icon: JSX.Element;
    fieldName: keyof IInjury;
}>

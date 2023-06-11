export interface IInjury {
    firearm?: boolean;
    nuclear?: boolean;
    chemical?: boolean;
    biological?: boolean;
    other?: boolean;
    hypothermia?: boolean;
    illness?: boolean;
    infection?: boolean;
    mechanical?: boolean;
    reactive?: boolean;
}

export type InjuryFieldType = Record<number, {
    name: string;
    icon: JSX.Element;
    fieldName: keyof IInjury;
}>

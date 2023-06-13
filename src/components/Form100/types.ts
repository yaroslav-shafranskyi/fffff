import { BodyDamageInfo, IBodyImage, IEvacuation, IForm100, IInjury, IMedicalHelp, IPerson } from "../../api";


export type Form100ValuesTypes = string | number | boolean | Date | IPerson | IBodyImage | BodyDamageInfo[] | IInjury | IMedicalHelp | IEvacuation | undefined;

/** 
    @params field: root field of IForm100
    @params value: value of Form100 that should be updated
    @params path: (optional) path to root field of IForm100
*/
export type UpdateForm100Type = (field: keyof IForm100 & string, value: Form100ValuesTypes, path?: string) => void;

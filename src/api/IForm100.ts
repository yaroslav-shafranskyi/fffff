import { BodyDamageInfo } from "./BodyDamageInfo";
import { IBodyImage } from "./IBodyImage";
import { IEvacuation } from "./IEvacuation";
import { IInjury } from "./IInjury";
import { IMedicalHelp } from "./IMedicalHelp";
import { IPerson } from "./IPerson";
import { IPlait } from "./IPlait";
import { RecordType } from "./IRecord";
import { SanitaryTreatmentStatus } from "./SanitaryTreatmentStatus";

export type Form100PersonData = Pick<
  IPerson,
  | "birthDate"
  | "id"
  | "fullName"
  | "personalId"
  | "tokenNumber"
  | "rank"
  | "gender"
  | "militaryBase"
>;

export interface IForm100 {
  id: number;
  clinic: string;
  author: string;
  person: Form100PersonData;
  date: Date;
  accidentTime: Date;
  reason: RecordType;
  bodyImage: IBodyImage;
  bodyDamage: BodyDamageInfo[];
  injury?: IInjury;
  medicalHelp?: IMedicalHelp;
  plait?: IPlait;
  sanitaryTreatment: SanitaryTreatmentStatus;
  evacuation: IEvacuation;
  diagnosis: string;
  signature?: string;
  stage: string;
  fullDiagnosis: string;
  treatmentInfo: string;
  fullEvacuationInfo: string;
  result: string;
  selfLeave?: boolean;
  carriedBy?: string;
  timeAfterAccident?: number;
  firstAidInfo: string;
}

export interface IResponseForm100
  extends Omit<IForm100, "accidentTime" | "date" | "plait" | "person"> {
  accidentTime: string;
  date: string;
  plait?: string | null;
  person: Omit<Form100PersonData, 'birthDate'> & {
    birthDate?: string | null;
  };
}

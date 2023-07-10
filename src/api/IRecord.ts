import { IConclusion } from "./IConclusion";
import { Forms } from "./Forms";
import { IDischarge } from "./IDischarge";
import { IForm100 } from "./IForm100";
import { IReferral } from "./IReferral";
import { IPersonBrief } from "./IPerson";

export enum RecordType {
  INJURY = "injury",
  SICK = "sick",
}

export type IForm100Record = Omit<IForm100, "person">;

export type IDischargeRecord = Omit<IDischarge, "person">;

export type IReferralRecord = Omit<IReferral, "personId">;

export type IConclusionRecord = Omit<IConclusion, "person">;

export interface IBriefRecord {
  date: number;
  fullDiagnosis: string;
  id: number;
  type: Forms;
  formId: number;
  doctorId: number;
  personId: number;
}

export interface ILastRecords {
  form100?: number;
  brief?: number;
  discharge?: number;
  referral?: number;
  conclusion?: number;
}

export type IUserBriefRecord = IBriefRecord & IPersonBrief;

export type QueryUserRecordsData = {
  entities: IUserBriefRecord[];
  total: number;
};

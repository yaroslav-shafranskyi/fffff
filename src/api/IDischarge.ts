import { ICommonFormHeaderFields } from "./ICommonFormHeaderFields";
import { IDischargeDates, IResponseDischargeDates } from "./IDischargeDates";
import { IPerson } from "./IPerson";

export enum DischargeReason {
  DISCHARGE = "DISCHARGE",
  DEATH = "DEATH",
}

export interface IDischarge extends ICommonFormHeaderFields {
  id: number;
  receiver: string;
  person: IPerson;
  datesData: IDischargeDates;
  reason: DischargeReason;
  fullDiagnosis: string;
  info: string;
  recommendations: string;
  date: Date;
  doctor: string;
}

export interface IResponseDischarge
  extends Omit<IDischarge, "date" | "datesData" | "order"> {
  date: string;
  datesData: IResponseDischargeDates;
  order: {
    date: string;
    number: string;
  };
}

import { IAddress } from "./IAddress";
import { Gender } from "./Gender";
import { IBriefRecord, ILastRecords, IResponseBriefRecord } from "./IRecord";
import { Rank } from "./Rank";

export interface IPerson {
  id: number;
  fullName: string;
  personalId: string;
  tokenNumber: string;
  birthDate?: Date;
  rank: Rank;
  gender: Gender;
  militaryBase: string; // TODO declare type
  records: IBriefRecord[];
  lastRecords: ILastRecords;
  phoneNumber?: string;
  address?: IAddress;
  profession?: string;
}

export interface IResponsePerson
  extends Omit<IPerson, "birthDate" | "records"> {
  birthDate?: string | null;
  records: IResponseBriefRecord[];
}

export interface IPersonBrief
  extends Omit<
    IPerson,
    "records" | "lastRecords" | "address" | "profession" | "phoneNumber" | "tokenNumber"
  > {
  updatedAt?: Date;
  lastRecordDiagnosis?: string;
  recordsQuantity?: number;
}

export interface IResponsePersonBrief
  extends Omit<IPersonBrief, "updatedAt" | "birthDate"> {
  updatedAt?: string | null;
  birthDate?: string | null;
}

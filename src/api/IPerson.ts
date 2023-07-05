import { IAddress } from "./IAddress";
import { Gender } from "./Gender";
import { IBriefRecord, ILastRecords } from "./IRecord";
import { Rank } from "./Rank";

export interface IPerson {
  id: number;
  fullName: string;
  personalId: string;
  tokenNumber: string;
  birthDate?: number;
  rank: Rank;
  gender: Gender;
  militaryBase: string; // TODO declare type
  records: IBriefRecord[];
  lastRecords: ILastRecords;
  phoneNumber?: string;
  address?: IAddress;
  profession?: string;
}

export interface IPersonBrief
  extends Omit<
    IPerson,
    "records" | "lastRecords" | "address" | "profession" | "phoneNumber" | "tokenNumber"
  > {
  updatedAt?: number;
  lastRecordDiagnosis?: string;
  recordsQuantity?: number;
}

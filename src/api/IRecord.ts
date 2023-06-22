import { IForm100 } from ".";

export enum RecordType {
    INJURY = 'injury',
    SICK = 'sick'
}

export type IForm100Record = Omit<IForm100, 'person'>;

export interface IBriefRecord {
    date: Date;
    fullDiagnosis: string;
}

export interface ILastRecords {
    form100: IForm100Record;
    brief: IBriefRecord;
}

export interface IRecords {
    form100: IForm100Record[];
    brief: IBriefRecord[];
}

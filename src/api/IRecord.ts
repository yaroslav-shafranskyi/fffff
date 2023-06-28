import { IDischarge } from './IDischarge';
import { IForm100 } from './IForm100';

export enum RecordType {
    INJURY = 'injury',
    SICK = 'sick'
}

export type IForm100Record = Omit<IForm100, 'person'>;

export type IDischargeRecord = Omit<IDischarge, 'person'>;

export interface IBriefRecord {
    date: Date;
    fullDiagnosis: string;
    id: string;
}

export interface ILastRecords {
    form100?: IForm100Record;
    brief?: IBriefRecord;
    discharge?: IDischargeRecord
}

export interface IRecords {
    form100: IForm100Record[];
    brief: IBriefRecord[];
    discharge: IDischargeRecord[];
}

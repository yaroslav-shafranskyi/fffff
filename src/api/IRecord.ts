import { IForm100 } from ".";

export enum RecordType {
    INJURY = 'injury',
    SICK = 'sick'
}

export type IRecord = Omit<IForm100, 'person'>;

export enum RecordType {
    INJURY = 'injury',
    SICK = 'sick'
}

export interface IRecord {
    type: RecordType;
    date: Date;
    author: string; // TODO declare type
    resume: string;  // TODO declare type
}

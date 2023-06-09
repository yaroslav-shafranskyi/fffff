export enum RecordType {
    INJURY = 'injury',
    SICK = 'sick'
}

export interface IRecord {
    type: RecordType;
    date: Date;
}

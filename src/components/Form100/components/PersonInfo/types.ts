import { Gender, IPerson, IRecord, Rank, RecordType } from "../../../../api"

export type PersonDataType = Omit<IPerson, 'records' | 'birthDate'>;
export interface IPersonState extends Pick<IPerson, 'id' | 'tokenNumber' | 'rank' | 'gender' | 'militaryBase' >  {
    personFullName: string;
    newRecordDate: Date;
    newRecordHour: number;
    newRecordMinute: number;
    newRecordDay: number;
    newRecordMonth: number;
    newRecordYear: number;
    newRecordReason: RecordType;
}

export type PersonDataValuesType = string | Rank | Gender | IRecord
export type PersonStateValues = string | Date | Rank | Gender | RecordType;

export type UpdatePersonDataType = (key: keyof PersonDataType, value: PersonDataValuesType | PersonStateValues, path?: string) => void;

export interface IPersonInfoProps {
    data?: PersonDataType;
    onChange?: UpdatePersonDataType;
}

export type UpdatePersonStateType = (key: keyof IPersonState, value: PersonStateValues) => () => void;

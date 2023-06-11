import { IPerson, RecordType } from "../../../../api"

export interface PersonDataType extends Pick<IPerson, 'id' | 'tokenNumber' | 'rank' | 'gender' | 'militaryBase' >  {
    personFullName: string;
    newRecordDate: Date;
    newRecordHour: number;
    newRecordMinute: number;
    newRecordDay: number;
    newRecordMonth: number;
    newRecordYear: number;
    newRecordReason: RecordType;
}

export interface IPersonInfoProps {
    data?: PersonDataType;
}

import { IEvacuation, IForm100, IPerson } from "../../../../api";

export interface ICounterfoilFrontData extends Pick<IForm100, 'date' | 'person' | 'diagnosis' | 'medicalHelp'| 'injury' | 'reason' > {
    evacuation: Pick<IEvacuation, 'transport' | 'clinic'>;
}

export interface ICounterfoilFrontProps {
    data?: ICounterfoilFrontData;
}

export interface ICounterfoilFrontState extends Omit<ICounterfoilFrontData, 'person'>, Pick<IPerson, 'id' | 'tokenNumber' | 'rank' | 'gender' | 'militaryBase' > {
    newRecordDate: Date;
    newRecordHour: number;
    newRecordMinute: number;
    newRecordDay: number;
    newRecordMonth: number;
    newRecordYear: number;
    personFullName: string;
}

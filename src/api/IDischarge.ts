import { IDischargeDates } from './IDischargeDates';
import { IPerson } from './IPerson';

export enum DischargeReason {
    DISCHARGE = 'DISCHARGE',
    DEATH = 'DEATH',
}

export interface IDischarge {
    department: string;
    clinic: string;
    code: string;
    order: {
        date: Date;
        number: number;
    };
    receiver: string;
    person: IPerson;
    datesData: IDischargeDates;
    reason: DischargeReason;
    fullDiagnosis: string;
    info: string;
    recommendations: string;
    date: Date;
    doctor: string;
}

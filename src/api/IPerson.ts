import { Gender } from './Gender';
import { IRecord } from './IRecord';
import { Rank } from './Rank';

export interface IPerson {
    id: string;
    firstName: string;
    secondName: string;
    lastName: string;
    tokenNumber: string;
    birthDate: Date;
    rank: Rank;
    gender: Gender;
    militaryBase: string; // TODO declare type
    records: IRecord[];
    lastRecord: IRecord;
}

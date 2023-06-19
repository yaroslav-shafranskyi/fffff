import { Gender, IPerson, IRecord, Rank } from "../../api";

export const defaultPersonData: IPerson = {
    rank: '' as Rank,
    militaryBase: '',
    fullName: '',
    id: '',
    tokenNumber: '',
    gender: '' as Gender,
    records: [],
    lastRecord: {} as IRecord,
};

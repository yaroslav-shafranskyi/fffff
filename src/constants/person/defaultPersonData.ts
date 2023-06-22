import { Gender, IPerson, ILastRecords, Rank } from "../../api";

export const defaultPersonData: IPerson = {
    rank: '' as Rank,
    militaryBase: '',
    fullName: '',
    id: '',
    tokenNumber: '',
    gender: '' as Gender,
    records: {
        form100: [],
        brief: [],
    },
    lastRecords: {} as ILastRecords,
};

import { Gender, IPerson, Rank } from "../../api";

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
        discharge: [],
    },
    lastRecords: {},
    address: {
        oblast: '',
        region: '',
        settlement: '',
        street: '',
        building: '',
        appartments: '',
    },
};

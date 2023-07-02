import { Gender, IPerson, Rank } from "../../api";

export const defaultPersonData: IPerson = {
    rank: '' as Rank,
    militaryBase: '',
    fullName: '',
    // TODO: id should be incrementally generated on back-end
    id: String(Math.round(Math.random() * 1000000)),
    personalId: '',
    tokenNumber: '',
    gender: '' as Gender,
    records: {
        form100: [],
        brief: [],
        discharge: [],
        referral: [],
        conclusion: [],
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

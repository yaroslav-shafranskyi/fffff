import { Gender, IRecord, Rank } from "../../../../api";

import { PersonDataType } from "./types";

export const getDefaultPersonData = (date?: Date): PersonDataType => ({
    rank: '' as Rank,
    militaryBase: '',
    fullName: '',
    id: '',
    tokenNumber: '',
    gender: '' as Gender,
    lastRecord: {
        date: date ?? new Date()
    } as IRecord,
});

import { Gender, IRecord, Rank } from "../../../../api";

import { PersonDataType } from "./types";

export const getDefaultPersonData = (): PersonDataType => ({
    rank: '' as Rank,
    militaryBase: '',
    fullName: '',
    id: '',
    tokenNumber: '',
    gender: '' as Gender,
    lastRecord: {} as IRecord,
});

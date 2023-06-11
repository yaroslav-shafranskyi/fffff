import { Gender, Rank, RecordType } from "../../../../api";
import { getDateData } from "../../../../helpers";

import { PersonDataType } from "./types";

export const getDefaultPersonData = (): PersonDataType => {
    const newDate = new Date();
    const { hours, minutes, day, month, year } = getDateData(newDate);
    
    return {
        rank: '' as Rank,
        militaryBase: '',
        personFullName: '',
        id: '',
        tokenNumber: '',
        gender: '' as Gender,
        newRecordDate: newDate,
        newRecordHour: hours,
        newRecordMinute: minutes,
        newRecordDay: day,
        newRecordMonth: month,
        newRecordYear: year,
        newRecordReason: '' as RecordType,
    }
};

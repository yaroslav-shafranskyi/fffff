import { Gender, IRecord, Rank, RecordType } from "../../../../api";
import { getDateData } from "../../../../helpers";

import { PersonDataType, IPersonState } from "./types";

export const defaultPersonData: PersonDataType = {
    rank: '' as Rank,
    militaryBase: '',
    firstName: '',
    secondName: '',
    lastName: '',
    id: '',
    tokenNumber: '',
    gender: '' as Gender,
    lastRecord: {} as IRecord,
};

export const getDefaultPersonState = (date?: Date): IPersonState => {
    const newDate = date ?? new Date();
    const { hours, minutes, day, month, year } = getDateData(newDate);
    
    return {
        ...defaultPersonData,
        personFullName: '',
        newRecordDate: undefined as unknown as Date,
        newRecordHour: hours,
        newRecordMinute: minutes,
        newRecordDay: day,
        newRecordMonth: month,
        newRecordYear: year,
        newRecordReason: '' as RecordType,
    }
};

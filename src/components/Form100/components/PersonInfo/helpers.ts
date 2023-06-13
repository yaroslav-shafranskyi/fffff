import { getDateData } from "../../../../helpers";
import { splitFullName } from "../../../../helpers/fieldsConverters/splitFullName";

import { IPersonState, PersonDataType } from "./types";

export const convertPersonDataTypeToIPersonState = (data: PersonDataType): IPersonState => {
    const { firstName, secondName, lastName, lastRecord } = data;
    const { type: newRecordReason, date: newRecordDate } = lastRecord ?? {};
    // @ts-expect-error new record values can be empty if the form is new
    const { hours, minutes, day, month, year } = newRecordDate ? getDateData(newRecordDate) : {};
    
    return {
        ...data,
        personFullName: `${firstName} ${secondName} ${lastName}`,
        newRecordDate,
        newRecordHour: hours,
        newRecordMinute: minutes,
        newRecordDay: day,
        newRecordMonth: month,
        newRecordYear: year,
        newRecordReason,
    };
};

export const convertIPersonStateToPersonDataType = (state: IPersonState): PersonDataType => {
    const {
        personFullName,
        rank,
        militaryBase,
        id,
        tokenNumber,
        gender,
        newRecordDate,
        newRecordReason,
    } = state;
    const { firstName, secondName, lastName } = splitFullName(personFullName);

    return {
        firstName,
        secondName,
        lastName,
        rank,
        militaryBase,
        id,
        tokenNumber,
        gender,
        lastRecord: {
            date: newRecordDate,
            type: newRecordReason,
            author: '',
            resume: ''
        },
    };
};

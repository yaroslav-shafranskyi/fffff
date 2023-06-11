import { Rank, EvacuationTransport, EvacuationClinic, Gender, RecordType } from '../../../../api';
import { getDateData } from '../../../../helpers';
import { MonthName } from '../../../../interfaces';

import { ICounterfoilFrontState } from './types';

export const getDefaultCounterfoilFrontState = ():ICounterfoilFrontState => {
    const newDate = new Date();
    const { hours, minutes, day, month, year } = getDateData(newDate);
    
    return {
        date: newDate,
        newRecordDate: newDate,
        newRecordHour: hours,
        newRecordMinute: minutes,
        newRecordDay: day,
        newRecordMonth: month as MonthName,
        newRecordYear: year,
        rank: '' as Rank,
        militaryBase: '',
        personFullName: '',
        id: '',
        tokenNumber: '',
        gender: '' as Gender,
        reason: '' as RecordType,
        evacuation: {
            transport: '' as EvacuationTransport,
            clinic: '' as EvacuationClinic
        },
        medicalHelp: {},
        diagnosis: '',
    }
};

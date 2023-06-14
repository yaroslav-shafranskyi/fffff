import { EvacuationTransport, EvacuationClinic, RecordType } from '../../../../api';

import { getDefaultPersonData } from '../PersonInfo';

import { ICounterfoilFrontData } from './types';

export const getDefaultCounterfoilFrontState = (date?: Date):ICounterfoilFrontData => ({
    date: date ?? new Date(),
    person: getDefaultPersonData(date),
    reason: '' as RecordType,
    evacuation: {
        transport: '' as EvacuationTransport,
        clinic: '' as EvacuationClinic
    },
    medicalHelp: {},
    diagnosis: '',
});

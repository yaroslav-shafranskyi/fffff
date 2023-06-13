import { EvacuationTransport, EvacuationClinic, RecordType } from '../../../../api';

import { defaultPersonData } from '../PersonInfo';

import { ICounterfoilFrontData } from './types';

export const getDefaultCounterfoilFrontState = ():ICounterfoilFrontData => ({
    date: new Date(),
    person: defaultPersonData,
    reason: '' as RecordType,
    evacuation: {
        transport: '' as EvacuationTransport,
        clinic: '' as EvacuationClinic
    },
    medicalHelp: {},
    diagnosis: '',
});

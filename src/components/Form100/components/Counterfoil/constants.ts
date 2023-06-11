import { EvacuationTransport, EvacuationClinic, RecordType } from '../../../../api';

import { getDefaultPersonData } from '../PersonInfo';

import { ICounterfoilFrontState } from './types';

export const getDefaultCounterfoilFrontState = ():ICounterfoilFrontState => ({
    date: new Date(),
    ...getDefaultPersonData(),
    reason: '' as RecordType,
    evacuation: {
        transport: '' as EvacuationTransport,
        clinic: '' as EvacuationClinic
    },
    medicalHelp: {},
    diagnosis: '',
});

import { IEvacuation } from '../../../../api';
import { BodyImageBack, BodyImageFront } from '../../../../assets';
import { getDefaultCounterfoilFrontState } from '../Counterfoil/constants';
import { getDefaultPersonData } from '../PersonInfo';
import { IMainFrontData } from './types';

export const defaultMainFrontData: IMainFrontData = {
    clinic: '',
    person: getDefaultPersonData(),
    ...getDefaultCounterfoilFrontState(),
    bodyImage: {
        front: <BodyImageFront />,
        back: <BodyImageBack />
    },
    evacuation: {} as IEvacuation,
};

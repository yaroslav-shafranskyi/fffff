import { IEvacuation } from '../../../../api';
import { BodyImageBack, BodyImageFront } from '../../../../assets';
import { getDefaultCounterfoilFrontState } from '../Counterfoil/constants';
import { IMainFrontState } from './types';

export const defaultMainFrontState: IMainFrontState = {
    clinic: '',
    ...getDefaultCounterfoilFrontState(),
    bodyImage: {
        front: <BodyImageFront />,
        back: <BodyImageBack />
    },
    bodyDamage: [],
    evacuation: {} as IEvacuation,
};

import { IEvacuation } from '../../../../api';
import { BodyImageBack, BodyImageFront } from '../../../../assets';
import { getDefaultCounterfoilFrontState } from '../Counterfoil/constants';
import { IMainFrontData } from './types';

export const defaultMainFrontData: IMainFrontData = {
    clinic: '',
    ...getDefaultCounterfoilFrontState(),
    bodyImage: {
        front: <BodyImageFront />,
        back: <BodyImageBack />
    },
    bodyDamage: [],
    evacuation: {} as IEvacuation,
};

import { BodyImageBack, BodyImageFront } from '../../../../assets';

import { BodyDamageDataType } from './types';

export const defaultBodyDamageData: BodyDamageDataType = {
    image: {
        front: <BodyImageFront />,
        back: <BodyImageBack />,
    },
    info: [],
};

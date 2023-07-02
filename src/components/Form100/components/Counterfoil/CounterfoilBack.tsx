import { Box, Typography } from '@mui/material';

import { SelfLeave } from '../SelfLeave';
import { CarriedBy } from '../CarriedBy';
import { BackField } from '../BackField';
import { TimeAfterAccident } from '../TimeAfterAccident';

import { backTitleStyles, backWrapperStyles, titleStyles, carriedByStyles } from './styles';

export const CounterfoilBack = () => {
    return (
        <Box sx={backWrapperStyles}>
            <Box sx={backTitleStyles}>
                <Typography sx={titleStyles}>
                    Особливі замітки лікаря
                </Typography>
            </Box>
            <SelfLeave />
            <CarriedBy />
            <TimeAfterAccident />
            <BackField
                title={'Перша допомога надана (яка, ким)'}
                field='firstAidInfo'
                rows={16}
                titleStyles={carriedByStyles}
            />
        </Box>
    )
};

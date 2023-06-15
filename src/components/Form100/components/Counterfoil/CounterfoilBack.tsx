import { Box, Typography } from '@mui/material';

import { SelfLeave } from '../SelfLeave';
import { CarriedBy } from '../CarriedBy';
import { BackField } from '../BackField';

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
            <BackField
                title={'Перша допомога надана (яка, ким)'}
                field='firstAidInfo'
                rows={16}
                titleStyles={carriedByStyles}
            />
        </Box>
    )
};

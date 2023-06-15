import { Box, Typography } from '@mui/material';

import { MainBack } from '../Main';
import { CounterfoilBack } from '../Counterfoil';

import { containerStyles, tipWrapperStyles } from './styles';

export const Back = () =>
    <Box sx={containerStyles}>
        <Box>
            <Box sx={tipWrapperStyles}>
                <Typography variant='caption'>
                    (Зворотний бік)
                </Typography>
            </Box>
            <MainBack />
        </Box>
        <CounterfoilBack />
    </Box>

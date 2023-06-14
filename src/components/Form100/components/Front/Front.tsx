import { Box } from '@mui/material';

import { CounterfoilFront, MainFront } from "../";

import { formWrapperStyles } from "./styles";

export const Front = () =>
    <Box sx={formWrapperStyles}>
        <CounterfoilFront />
        <MainFront />
    </Box>

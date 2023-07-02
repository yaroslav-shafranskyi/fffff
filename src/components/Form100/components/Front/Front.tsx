import { FC } from 'react';
import { Box } from '@mui/material';

import { CounterfoilFront, MainFront } from "../";

import { formWrapperStyles } from "./styles";
import { IFrontProps } from './types';

export const Front: FC<IFrontProps> = ({ readonly }) =>
    <Box sx={formWrapperStyles}>
        <CounterfoilFront readonly={readonly} />
        <MainFront readonly={readonly} />
    </Box>

import { FC, useRef } from 'react';
import { Box, Typography } from '@mui/material';

import { Input } from '../Input';

import { IInputWithTextIndentProps } from "./types";
import { getMultilineInputPropsSx, inputTitleStyles } from './styles';

export const InputWithTextIndent: FC<IInputWithTextIndentProps> = ({ title, inputProps }) => {
    const titleRef = useRef<HTMLDivElement>(null);

    return (
        <Box sx={{ position: 'relative' }}>
            <Box sx={inputTitleStyles} ref={titleRef}>
                <Typography>
                    {title}
                </Typography>
            </Box>
            <Input
                { ...inputProps }
                inputProps={{
                    sx: getMultilineInputPropsSx(titleRef.current?.clientWidth)
                }}
            />
        </Box>
    );
};

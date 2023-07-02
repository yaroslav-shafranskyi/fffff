import { FC, useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';

import { Input } from '../Input';

import { IInputWithTextIndentProps } from "./types";
import { getMultilineInputPropsSx, inputTitleStyles } from './styles';

export const InputWithTextIndent: FC<IInputWithTextIndentProps> = ({ title, inputProps }) => {
    const titleRef = useRef<HTMLDivElement>(null);
    const [textIndent, setTextIndent] = useState<number | '100%'>('100%');

    useEffect(() => {
        if (titleRef.current?.clientWidth) {
            setTextIndent(titleRef.current?.clientWidth)
        }
    }, [titleRef.current?.clientWidth]);

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
                    sx: getMultilineInputPropsSx(textIndent)
                }}
            />
        </Box>
    );
};

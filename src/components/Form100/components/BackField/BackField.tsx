import { ChangeEvent, useRef } from 'react';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, Typography } from '@mui/material';

import { Input } from '../../../../shared';
import { IForm100 } from '../../../../api';

import { IBackFieldProps } from './types';
import { MIN_TEXT_INDENT, inputStyles, titleStyles, wrapperStyles } from './styles';

export const BackField: FC<IBackFieldProps> = (props) => {
    const { title, field, rows = 3 } = props;
    const { watch, setValue } = useFormContext<IForm100>();

    const fullDiagnosis = watch(field);

    const titleRef = useRef<HTMLDivElement>(null)
    
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(field, event.target.value);
    }

    return (
        <Box sx={wrapperStyles}>
            <Box sx={titleStyles} ref={titleRef}>
                <Typography>
                    {title}
                </Typography>
            </Box>
            <Input 
                value={fullDiagnosis}
                multiline={true}
                rows={rows}
                sx={inputStyles}
                inputProps={{ sx: { textIndent: titleRef.current?.clientWidth ?? MIN_TEXT_INDENT }}}
                onChange={handleChange}
            />
        </Box>
    );
};

import { ChangeEvent, useRef } from 'react';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, Typography } from '@mui/material';

import { Input } from '../../../../shared';

import { IForm100BackState } from '../../types';

import { IBackFieldProps } from './types';
import { inputStyles, titleStyles, wrapperStyles } from './styles';

export const BackField: FC<IBackFieldProps> = (props) => {
    const { title, field, rows, titleStyles: propsTitleStyles } = props;
    const { formState, clearErrors, getValues, setValue } = useFormContext<IForm100BackState>();

    const value = getValues(field);

    const error = formState.errors[field]?.message;

    const titleRef = useRef<HTMLDivElement>(null)
    
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(field, event.target.value);
        clearErrors(field);
    }

    return (
        <Box>
            <Box sx={wrapperStyles}>
                <Box sx={propsTitleStyles ?? titleStyles} ref={titleRef}>
                    <Typography>
                        {title}
                    </Typography>
                </Box>
                <Input 
                    value={value}
                    multiline={true}
                    rows={rows}
                    sx={inputStyles}
                    inputProps={{ sx: { textIndent: titleRef.current?.clientWidth ?? '100%' }}}
                    onChange={handleChange}
                />
            </Box>
            {error && <Typography color='error'>{error}</Typography>}
        </Box>
    );
};

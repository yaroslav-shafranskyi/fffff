import { ChangeEvent, FC, useCallback } from 'react';
import { useFormContext, FieldPath } from 'react-hook-form';
import { Box, Typography } from '@mui/material';

import { IDischarge } from '../../../../api';
import { IFCPropsWithReadonly } from '../../../../interfaces';
import { Input } from '../../../../shared';
import { inputHintStyles, inputTitleStyles } from '../../styles';

import { receiverInputPropsSx, receiverInputStyles } from './styles';

export const Receiver: FC<IFCPropsWithReadonly> = ({ readonly }) => {
    const { setValue, watch, register } = useFormContext<IDischarge>();

    const handleInputChange = useCallback((field: FieldPath<IDischarge>) =>
        (event: ChangeEvent<HTMLInputElement>) => {
            if (!readonly) {
                    setValue(field, event.target.value)
                }
    }, [readonly, setValue]);

    return (
        <Box sx={{ position: 'relative' }}>
            <Typography variant='caption' sx={inputHintStyles}>
                (найменування і місцезнаходження закладу охорони здоров’я, куди направляється виписка)
            </Typography>
            <Box sx={inputTitleStyles}>
                <Typography>У</Typography>
            </Box>
            <Input
                sx={receiverInputStyles}
                multiline={true}
                rows={4}
                {...register('receiver')}
                onChange={handleInputChange('receiver')}
                value={watch('receiver')}
                inputProps={{ sx: receiverInputPropsSx }}
            />
        </Box>
    );
};

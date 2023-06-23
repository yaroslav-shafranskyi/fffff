import { FC, useCallback } from 'react';
import { FieldPath, useFormContext } from 'react-hook-form';
import { Box, Typography } from '@mui/material';

import { IFCPropsWithReadonly } from '../../../../interfaces';
import { IDischarge, IDischargeDates } from '../../../../api';

import { SingleDateField } from './SingleDateField';

export const Dates: FC<IFCPropsWithReadonly> = ({ readonly }) => {
    const { formState, watch, setValue, clearErrors } = useFormContext<IDischarge>();
    const { sick, referral, arrival, leaving } = watch('datesData');
    const errors = formState.errors.datesData;
    
    const handleChange = useCallback((field: FieldPath<IDischargeDates>) => (date?: Date) => {
        if (!date || readonly) {
            return;
        }
        setValue(`datesData.${field}`, date)
        clearErrors(`datesData.${field}`);
    }, [readonly, setValue, clearErrors]);

    return (
        <Box>
            <Typography>
                {'5. Дати: а) в амбулаторно-поліклінічному закладі:'}
            </Typography>
            <SingleDateField
                title='захворювання'
                value={sick}
                error={errors?.sick?.message}
                onChange={handleChange('sick')}
            />
            <SingleDateField
                title='направлення в стаціонар'
                value={referral}
                error={errors?.referral?.message}
                onChange={handleChange('referral')}
            />
            <SingleDateField
                title='б) у стаціонарі: надходження'
                value={arrival}
                error={errors?.arrival?.message}
                onChange={handleChange('arrival')}
            />
            <SingleDateField
                title='виписки або смерті (підкреслити)'
                value={leaving}
                error={errors?.leaving?.message}
                onChange={handleChange('leaving')}
            />
        </Box>
    )
};

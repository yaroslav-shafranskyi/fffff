import { FC, useCallback } from 'react';
import { FieldPath, useFormContext } from 'react-hook-form';
import { Box, Typography } from '@mui/material';

import { IFCPropsWithReadonly } from '../../../../interfaces';
import { DischargeReason, IDischarge, IDischargeDates } from '../../../../api';

import { SingleDateField } from './SingleDateField';
import { reasonWrapperStyles } from './styles';

export const Dates: FC<IFCPropsWithReadonly> = ({ readonly }) => {
    const { formState, watch, setValue, clearErrors } = useFormContext<IDischarge>();
    const { sick, referral, arrival, leaving } = watch('datesData');
    const errors = formState.errors.datesData;
    const reasonError = formState.errors.reason?.message;
    
    const handleChange = useCallback((field: FieldPath<IDischargeDates>) => (date?: Date) => {
        if (!date || readonly) {
            return;
        }
        setValue(`datesData.${field}`, date.getTime())
        clearErrors(`datesData.${field}`);
    }, [readonly, setValue, clearErrors]);

    const updateReason = useCallback((reason: DischargeReason) => () => {
        setValue('reason', reason);
        clearErrors('reason');
    }, [clearErrors, setValue]);

    const getReasonSx = useCallback((reason: DischargeReason) => reason === watch('reason') ? {textDecoration: 'underline'} : {}, [watch]); 

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
            <Box sx={reasonWrapperStyles}>
                <Box sx={{ cursor: 'pointer' }} onClick={updateReason(DischargeReason.DISCHARGE)}>
                    <Typography sx={getReasonSx(DischargeReason.DISCHARGE)}>виписки</Typography>
                </Box>
                <Typography>або</Typography>
                <Box sx={{ cursor: 'pointer' }} onClick={updateReason(DischargeReason.DEATH)}>
                    <Typography sx={getReasonSx(DischargeReason.DEATH)}>смерті</Typography>
                </Box>
                <SingleDateField
                    title='(підкреслити)'
                    value={leaving}
                    error={errors?.leaving?.message}
                    onChange={handleChange('leaving')}
                />
            </Box>
            {reasonError !== undefined && <Typography color='error'>{reasonError}</Typography>}
        </Box>
    )
};

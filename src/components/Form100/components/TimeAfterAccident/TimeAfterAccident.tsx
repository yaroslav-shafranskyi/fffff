import { ChangeEvent, FC, useCallback, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import { IFCPropsWithReadonly } from '../../../../interfaces';
import { Input } from '../../../../shared';
import {
    convertDateField,
    convertHoursToMilliseconds,
    convertMinutesToMilliseconds,
    getHoursFromMilliseconds,
    getRestMinutesFromMilliseconds
} from '../../../../helpers';

import { IForm100BackState } from '../../types';

import { textFieldStyles, wrapperStyles } from './styles';

export const TimeAfterAccident: FC<IFCPropsWithReadonly> = ({ readonly }) => {
    const { watch, setValue } = useFormContext<IForm100BackState>();
    
    const timeAfterAccident = watch('timeAfterAccident');

    const { hours, minutes } = useMemo(() => ({
        hours: convertDateField(getHoursFromMilliseconds(timeAfterAccident ?? 0)),
        minutes: convertDateField(getRestMinutesFromMilliseconds(timeAfterAccident ?? 0)),
    }), [timeAfterAccident])

    const updateHours = useCallback((value: number) => {
        if (!timeAfterAccident) {
            setValue('timeAfterAccident', convertHoursToMilliseconds(value));
            return;
        }
        const prevHours = getHoursFromMilliseconds(timeAfterAccident);
        const hoursDiff = value - prevHours;
        const newTime = timeAfterAccident + convertHoursToMilliseconds(hoursDiff);
        setValue('timeAfterAccident', newTime);
    }, [timeAfterAccident, setValue]);

    const updateMinutes = useCallback((value: number) => {
        if (!timeAfterAccident) {
            setValue('timeAfterAccident', convertMinutesToMilliseconds(value));
            return;
        }
        const prevMinutes = getRestMinutesFromMilliseconds(timeAfterAccident);
        const minutesDiff = value - prevMinutes;
        const newTime = timeAfterAccident + convertMinutesToMilliseconds(minutesDiff);
        setValue('timeAfterAccident', newTime)
    }, [setValue, timeAfterAccident])

    const handleChange = useCallback((field: 'hours' | 'minutes') => (event: ChangeEvent<HTMLInputElement>) => {
        if (readonly) {
            return;
        }
        const value = +event.target.value;
        if (Number.isNaN(value)) {
            return;
        }
        if (field === 'hours') {
           updateHours(value);
           return;
        }
        updateMinutes(value);
    }, [readonly, updateHours, updateMinutes]);

    return (
        <Box sx={wrapperStyles}>
            <Typography>Через</Typography>
            <Input 
                value={hours}
                sx={textFieldStyles}
                onChange={handleChange('hours')}
            />
            <Typography>год.</Typography>
            <Input 
                value={minutes}
                sx={textFieldStyles}
                onChange={handleChange('minutes')}
            />
            <Typography>хв. після поранення</Typography>
        </Box>
    );
};

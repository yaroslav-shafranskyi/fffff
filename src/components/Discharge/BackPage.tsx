import { ChangeEvent, FC, useCallback } from 'react';
import { FieldPath, useFormContext } from 'react-hook-form';
import { Box, Typography } from '@mui/material';

import { IFCPropsWithReadonly } from '../../interfaces';
import { commonInputStyles, multilineInputStyles } from '../../constants';

import { formContentStyles } from '../commonFormStyles';

import { DischargeBackPageState } from './types';
import { backPageFooterStyles, backPageWrapper, doctorHintStyles } from './styles';
import { Input, DateInputWithTextMonth } from '../../shared';

export const BackPage: FC<IFCPropsWithReadonly> = ({ readonly }) => {
    const { watch, setValue, clearErrors, register, formState } = useFormContext<DischargeBackPageState>();
    const { errors } = formState;

    const handleInputChange = useCallback((field: FieldPath<DischargeBackPageState>) =>
        (event: ChangeEvent<HTMLInputElement>) => {
            if (readonly) {
                return;
            }
            setValue(field, event.target.value);
            clearErrors(field);
        }, [clearErrors, readonly, setValue]);

    const handleDateChange = useCallback((date?: Date) => {
        if (readonly || !date) {
            return;
        }
        setValue('date', date);
        clearErrors('date');
    }, [clearErrors, readonly, setValue])

    return (
        <Box sx={formContentStyles}>
            <Box sx={backPageWrapper}>
                <Box>
                    <Typography>
                        7. Короткий анамнез, діагностичні дослідження, перебіг хвороби, проведене лікування, стан при направленні, при виписці
                    </Typography>
                    <Input
                        {...register('info')}
                        onChange={handleInputChange('info')}
                        value={watch('info')}
                        error={errors?.info?.message}
                        multiline={true}
                        rows={22} 
                        sx={commonInputStyles}
                        inputProps={{
                            sx: multilineInputStyles
                        }}
                    />
                </Box>
                <Box>
                    <Typography>
                        8. Лікувальні і трудові рекомендації
                    </Typography>
                    <Input
                        {...register('recommendations')}
                        onChange={handleInputChange('recommendations')}
                        value={watch('recommendations')}
                        error={errors?.recommendations?.message}
                        multiline={true}
                        rows={14} 
                        sx={commonInputStyles}
                        inputProps={{
                            sx: multilineInputStyles
                        }}
                    />
                </Box>
                <Box sx={backPageFooterStyles}>
                    <DateInputWithTextMonth value={watch('date')} onChange={handleDateChange} />
                    <Box sx={{ display: 'flex', gap: '2px' }}>
                        <Typography>Лікар</Typography>
                        <Box sx={{ display: 'grid' }}>
                            <Input
                                {...register('doctor')}
                                onChange={handleInputChange('doctor')}
                                value={watch('doctor')}
                                error={errors?.doctor?.message}
                            />
                            <Typography variant='caption' sx={doctorHintStyles}>(прізвище, підпис)</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
};

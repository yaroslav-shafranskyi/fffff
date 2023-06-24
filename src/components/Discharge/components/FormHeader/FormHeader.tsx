import { ChangeEvent, FC, useCallback } from 'react';
import { FieldPath, useFormContext } from 'react-hook-form';
import { Box, Typography } from '@mui/material';

import { Input } from '../../../../shared';
import { IDischarge } from '../../../../api';

import { IFCPropsWithReadonly } from '../../../../interfaces';
import { boldTextStyles } from '../../styles';

import { codeWrapperStyles, dateInputStyles, formHeaderInputPropsSx, formHeaderInputStyles, formHeaderItemStyles, formHeaderItemWithTitleStyles, formHeaderStyles, formHeaderTitleContentStyles, formHeaderTitleStyles, orderWrapperStyles } from './styles';
import { formatDateWithoutDots } from '../../../../helpers';
import { CustomDatePicker } from '../../../../shared/CustomDatePicker/CustomDatePicker';

export const FormHeader: FC<IFCPropsWithReadonly> = ({ readonly }) => {
    const { formState, watch, register, setValue, clearErrors } = useFormContext<IDischarge>();
    const { errors } = formState;

    const handleInputChange = useCallback((field: FieldPath<IDischarge>) =>
        (event: ChangeEvent<HTMLInputElement>) => {
            if (!readonly) {
                setValue(field, event.target.value)
                clearErrors(field);
            }
    }, [clearErrors, readonly, setValue]);

    const handleDateChange = useCallback((date?: Date) => {
        if (readonly || !date) {
            return;
        }
        setValue('order.date', date);
        clearErrors('order.date');
    }, [clearErrors, readonly, setValue]);

    return (
        <Box sx={formHeaderStyles}>
        <Box sx={formHeaderItemStyles}>
            <Typography variant='caption'>
                Найменування міністерства, іншого органу виконавчої влади, підприємства, установи, організації, до сфери управління якого належить заклад охорони здоров’я
            </Typography>
            <Input
                sx={formHeaderInputStyles}
                {...register('department')}
                value={watch('department')}
                rows={2}
                multiline={true}
                inputProps={{ sx: formHeaderInputPropsSx }}
                onChange={handleInputChange('department')}
                error={errors?.department?.message}
            />
            <Typography variant='caption'>
                Найменування та місцезнаходження (повна поштова адреса) закладу охорони здоров’я, де заповнюється форма
            </Typography>
            <Input
                sx={formHeaderInputStyles}
                {...register('clinic')}
                value={watch('clinic')}
                error={errors?.clinic?.message}
                onChange={handleInputChange('clinic')}
            />
            <Box sx={codeWrapperStyles}>
                <Typography variant='caption'>
                    Код за ЄДРПОУ
                </Typography>
                <Box>
                    <Input
                        sx={formHeaderInputStyles}
                        {...register('code')}
                        value={watch('code')}
                        error={errors?.code?.message}
                        onChange={handleInputChange('code')}
                    />
                </Box>
            </Box>
        </Box>
        <Box sx={formHeaderItemWithTitleStyles}>
            <Box sx={formHeaderTitleStyles}>
                <Typography sx={boldTextStyles}>
                    МЕДИЧНА ДОКУМЕНТАЦІЯ
                </Typography>
            </Box>
            <Box sx={formHeaderTitleContentStyles}>
                <Box>
                    <Typography>
                        Форма первинної облікової документації
                    </Typography>
                    <Typography sx={boldTextStyles}>
                        № 027/о
                    </Typography>
                </Box>
                <Typography sx={boldTextStyles}>
                    ЗАТВЕРДЖЕНО
                </Typography>
                <Box>
                    <Typography>
                        Наказ МОЗ України
                    </Typography>
                    <Box sx={orderWrapperStyles}>
                        <CustomDatePicker onChange={handleDateChange}>
                                <Input
                                    sx={dateInputStyles}
                                    error={errors?.order?.date?.message}
                                    value={formatDateWithoutDots(watch('order.date'))}
                                    />
                        </CustomDatePicker>
                        №
                        <Box>
                            <Input
                                {...register('order.number')}
                                sx={dateInputStyles}
                                value={watch('order.number') ?? ''}
                                error={errors?.order?.number?.message}
                                onChange={handleInputChange('order.number')}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box>
    )
};

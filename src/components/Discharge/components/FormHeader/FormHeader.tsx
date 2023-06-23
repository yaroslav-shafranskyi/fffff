import { ChangeEvent, FC, useCallback } from 'react';
import { FieldPath, useFormContext } from 'react-hook-form';
import { Box, Typography } from '@mui/material';

import { Input } from '../../../../shared';
import { IDischarge } from '../../../../api';

import { IFCPropsWithReadonly } from '../../../../interfaces';
import { boldTextStyles } from '../../styles';

import { codeWrapperStyles, formHeaderInputPropsSx, formHeaderInputStyles, formHeaderItemStyles, formHeaderItemWithTitleStyles, formHeaderStyles, formHeaderTitleContentStyles, formHeaderTitleStyles, orderWrapperStyles } from './styles';

export const FormHeader: FC<IFCPropsWithReadonly> = ({ readonly }) => {
    const { watch, register, setValue } = useFormContext<IDischarge>();

    const handleInputChange = useCallback((field: FieldPath<IDischarge>) =>
        (event: ChangeEvent<HTMLInputElement>) => {
            if (!readonly) {
                setValue(field, event.target.value)
            }
    }, [readonly, setValue]);

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
            />
            <Typography variant='caption'>
                Найменування та місцезнаходження (повна поштова адреса) закладу охорони здоров’я, де заповнюється форма
            </Typography>
            <Input
                sx={formHeaderInputStyles}
                {...register('clinic')}
                value={watch('clinic')}
                onChange={handleInputChange('clinic')}
            />
            <Box sx={codeWrapperStyles}>
                <Typography variant='caption'>
                    Код за ЄДРПОУ
                </Typography>
                <Input
                    sx={formHeaderInputStyles}
                    {...register('code')}
                    value={watch('code')}
                    onChange={handleInputChange('code')}
                />
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
                        <Input
                            {...register('order.date')}
                            value=''
                        />
                        №
                        <Input
                            {...register('order.number')}
                            value=''
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box>
    )
};

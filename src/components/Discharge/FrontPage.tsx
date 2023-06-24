import { ChangeEvent, useCallback, FC } from 'react';
import { Box, Typography } from '@mui/material';
import { FieldPath, useFormContext } from 'react-hook-form';

import { Input } from '../../shared';
import { IDischarge } from '../../api';
import { IFCPropsWithReadonly } from '../../interfaces';

import {
    boldTextStyles,
    commonInputStyles,
    contentDataWrapperStyles,
    contentTitleWrapperStyles,
    formContentStyles,
    formWrapperStyles,
    headerStyles,
    multilineInputStyles,
} from './styles';
import { FormHeader, Receiver, PersonInfo } from './components';
import { Dates } from './components/Dates/Dates';

export const FrontPage: FC<IFCPropsWithReadonly> = ({ readonly }) => {
    const { formState, watch, setValue, register, clearErrors } = useFormContext<IDischarge>();
    const errors = formState.errors;

    const handleInputChange = useCallback((field: FieldPath<IDischarge>) =>
        (event: ChangeEvent<HTMLInputElement>) => {
            if (readonly) {
                return;
            }
            setValue(field, event.target.value);
            clearErrors(field)
    }, [readonly, setValue, clearErrors]);

    return (
        <Box sx={formWrapperStyles}>
            <Box sx={headerStyles}>
                <Typography sx={boldTextStyles}>
                    ЗАТВЕРДЖЕНО
                </Typography>
                <Typography variant='caption'>
                    Наказ Міністерства охорони здоров’я України
                </Typography>
                <Typography variant='caption'>
                    14 лютого 2012 року № 110
                </Typography>
            </Box>
            <Box sx={formContentStyles}>
                <FormHeader readonly={readonly} />
                <Box sx={contentTitleWrapperStyles}>
                    <Typography sx={boldTextStyles}>
                        ВИПИСКА
                    </Typography>
                    <Typography sx={boldTextStyles}>
                        із медичної карти амбулаторного (стаціонарного) хворого
                    </Typography>
                </Box>
                <Box sx={contentDataWrapperStyles}>
                    <Receiver readonly={readonly} />
                    <PersonInfo readonly={readonly} />
                    <Dates readonly={readonly} />
                    <Box>
                        <Typography>
                            8. Повний діагноз (основне захворювання, супутні захворювання та ускладнення):
                        </Typography>
                        <Input
                            { ...register('fullDiagnosis')}
                            value={watch('fullDiagnosis')}
                            onChange={handleInputChange('fullDiagnosis')}
                            error={errors?.fullDiagnosis?.message}
                            multiline={true}
                            rows={12}
                            sx={commonInputStyles}
                            inputProps={{
                                sx: multilineInputStyles
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

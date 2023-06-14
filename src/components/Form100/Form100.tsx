import { FC, useCallback } from 'react';
import { Box } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { IForm100 } from '../../api';

import { CounterfoilFront, MainFront } from './components';

import { getInitialForm100 } from './constants';
import { form100Schema } from './schemas';
import { containerStyles, formWrapperStyles } from './styles';
import { UpdateForm100Type } from './types';

export interface IForm100Props {
    data?: IForm100;
}

export const Form100: FC<IForm100Props> = (props) => {
    const { data } = props;

    const methods = useForm<IForm100>({
        resolver: yupResolver(form100Schema),
        defaultValues: data ?? getInitialForm100(),
    });

    const { setValue, watch } = methods;

    const {
        clinic,
        date,
        person,
        diagnosis,
        medicalHelp,
        injury,
        reason,
        evacuation,
        bodyImage,
        bodyDamage,
        plait,
        sanitaryTreatment,
        signature,
    } = watch();

    console.log({ 
        clinic,
        date,
        person,
        diagnosis,
        medicalHelp,
        injury,
        reason,
        evacuation,
        bodyImage,
        bodyDamage,
        plait,
        sanitaryTreatment,
        signature,
     });

    return (
        <FormProvider {...methods}>
            <Box sx={containerStyles}>
                <Box sx={formWrapperStyles}>
                    <CounterfoilFront />
                    <MainFront />
                </Box>
            </Box>
        </FormProvider>
    )
};

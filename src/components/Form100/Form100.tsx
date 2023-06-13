import { FC, useCallback } from 'react';
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { IForm100 } from '../../api';

import { CounterfoilFront, MainFront } from './components';

import { initialForm100 } from './constants';
import { form100Schema } from './schemas';
import { containerStyles, formWrapperStyles } from './styles';
import { UpdateForm100Type } from './types';

export interface IForm100Props {
    data?: IForm100;
}

export const Form100: FC<IForm100Props> = (props) => {
    const { data } = props;

    const { getValues, setValue, watch } = useForm<IForm100>({
        resolver: yupResolver(form100Schema),
        defaultValues: data ?? initialForm100,
    });

    const {
        date,
        person,
        diagnosis,
        medicalHelp,
        injury,
        reason,
        evacuation,
    } = watch();

    const { transport, clinic } = evacuation;

    const updateForm100: UpdateForm100Type = useCallback((field, value, path) => {
        if (path) {
            setValue(`${field}.${path}` as keyof IForm100, value);
            return;
        }
        setValue(field, value);
    }, [setValue]);

    const counterfoilFrontData = {
        date,
        person,
        diagnosis,
        injury,
        medicalHelp,
        reason,
        evacuation: {
            transport,
            clinic,
        },
    };

    console.log({ counterfoilFrontData });

    return <Box sx={containerStyles}>
        <Box sx={formWrapperStyles}>
            <CounterfoilFront data={counterfoilFrontData} onChange={updateForm100} />
            <MainFront />
        </Box>
    </Box>
}
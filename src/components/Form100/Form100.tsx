import { FC } from 'react';
import { Box, Card } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { IForm100 } from '../../api';

import { getInitialForm100 } from './constants';
import { form100Schema } from './schemas';
import { containerStyles } from './styles';
import { Front, Back } from './components';

export interface IForm100Props {
    data?: IForm100;
}

export const Form100: FC<IForm100Props> = (props) => {
    const { data } = props;

    const methods = useForm<IForm100>({
        resolver: yupResolver(form100Schema),
        defaultValues: data ?? getInitialForm100(),
    });

    return (
        <FormProvider {...methods}>
            <Card sx={containerStyles}>
                <Front />
                <Back />
            </Card>
        </FormProvider>
    )
};

import { FC, useCallback, useMemo, useState } from 'react';
import { Card } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

import { ControlBar } from '../../shared';

import { form100FrontSchema, form100BackSchema } from './schemas';
import { containerStyles } from './styles';
import { Front, Back } from './components';
import { convertIForm100ToIForm100State } from './convertIForm100ToIForm100State';
import { IForm100BackState, IForm100FrontState, IForm100Props } from './types';

export const Form100: FC<IForm100Props> = (props) => {
    const { data } = props;

    const [page, setPage] = useState<number>(0);

    const navigate = useNavigate()

    const { front: initialFrontState, back: initialBackState} = useMemo(() => convertIForm100ToIForm100State(data), [data]);

    const frontMethods = useForm<IForm100FrontState>({
        defaultValues: initialFrontState,
        reValidateMode: 'onChange',
        resolver: yupResolver(form100FrontSchema),
    });

    const backMethods = useForm<IForm100BackState>({
        defaultValues: initialBackState,
        resolver: yupResolver(form100BackSchema),
    });

    const handleGoBack = useCallback(() => {
        if (!page) {
            navigate(-1);
            return;
        }
        setPage(0);
    }, [navigate, page]);

    const handleSubmit = useCallback(async () => {
        if (!page) {
            const result = await frontMethods.trigger();
            if (result) {
                setPage(1)
            }
            return;
        }
    }, [page, frontMethods]);

    const handleClear = useCallback(() => {
        frontMethods.reset();
        backMethods.reset();
    }, [frontMethods, backMethods]);

    return (
        <Card sx={containerStyles}>
            <ControlBar
                onClear={handleClear}
                onSubmit={handleSubmit}
                onBack={handleGoBack}
            />
            {!page ? 
                <FormProvider {...frontMethods}>
                    <Front />
                </FormProvider> : 
                <FormProvider {...backMethods}>
                    <Back />
                </FormProvider>}
        </Card>
    );
};

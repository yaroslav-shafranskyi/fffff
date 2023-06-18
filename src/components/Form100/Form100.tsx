import { useCallback, useMemo, useState } from 'react';
import { Card } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocation, useNavigate } from 'react-router-dom';

import { ControlBar } from '../../shared';
import { IRecord, useGetPerson, useUpdatePerson } from '../../api';

import { form100FrontSchema, form100BackSchema } from './schemas';
import { containerStyles } from './styles';
import { Front, Back } from './components';
import { convertIForm100ToIForm100State } from './convertIForm100ToIForm100State';
import { IForm100BackState, IForm100FrontState } from './types';
import { getInitialForm100 } from './constants';

export const Form100 = () => {
    const [page, setPage] = useState<number>(0);

    const location = useLocation();
    const { pathname, state } = location;
    const readonly = state?.readonly;

    const navigate = useNavigate();

    const id = useMemo(() => decodeURI(pathname.split('form100/')[1]), [pathname]);

    const { data: initialPerson} = useGetPerson(id);

    const { front: initialFrontState, back: initialBackState} = useMemo(() => {
        const initialData = !initialPerson?.lastRecord ? getInitialForm100() : { ...initialPerson.lastRecord, person: initialPerson };
        if (readonly) {
            return convertIForm100ToIForm100State(initialData);
        }
        return convertIForm100ToIForm100State({ ...getInitialForm100(), person: { ...initialData.person, lastRecord: {} as IRecord }});
    }, [initialPerson, readonly]);

    const frontMethods = useForm<IForm100FrontState>({
        defaultValues: initialFrontState,
        resolver: yupResolver(form100FrontSchema),
    });

    const { watch: watchFront, reset: resetFront, trigger: triggerFront } = frontMethods;
    const frontState = watchFront();
    const { person, ...restFrontState } = frontState;

    const { records, lastRecord } = person;

    const backMethods = useForm<IForm100BackState>({
        defaultValues: initialBackState,
        resolver: yupResolver(form100BackSchema),
    });

    const { watch: watchBack, reset: resetBack, trigger: triggerBack } = backMethods;

    const backState = watchBack();

    const { mutate } = useUpdatePerson();

    const handleGoBack = useCallback(() => {
        if (!page) {
            navigate(-1);
            return;
        }
        setPage(0);
    }, [navigate, page]);

    const navigateToBack = useCallback(async () => {
        const result = await triggerFront();
            if (result) {
                setPage(1);
            }
    }, [triggerFront]);

    const submitForm = useCallback(async () => {
        if (readonly) {
            return;
        }
        const result = await triggerBack();
        if (result) {
            const updatedLastRecord = { ...lastRecord, ...restFrontState, ...backState };
            mutate({...person, records: [...records, updatedLastRecord], lastRecord: updatedLastRecord });
        }
    }, [backState, lastRecord, mutate, person, readonly, records, restFrontState, triggerBack])

    const handleSubmit = useCallback(async () => {
        if (!page) {
            navigateToBack();
            return;
        }
        await submitForm();
        navigate('/');
    }, [navigate, navigateToBack, page, submitForm]);

    const handleClear = useCallback(() => {
        resetFront();
        resetBack();
    }, [resetFront, resetBack]);

    return (
        <Card sx={containerStyles}>
            <ControlBar
                submitButtonText={!page ? 'Далі' : undefined}
                onClear={handleClear}
                onSubmit={handleSubmit}
                onBack={handleGoBack}
            />
            {!page ? 
                <FormProvider {...frontMethods}>
                    <Front readonly={readonly} />
                </FormProvider> : 
                <FormProvider {...backMethods}>
                    <Back />
                </FormProvider>}
        </Card>
    );
};

import { useCallback, useMemo, useState } from 'react';
import { Card } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocation, useNavigate } from 'react-router-dom';

import { ControlBar } from '../../shared';
import { IForm100, useGetPerson, useUpdatePerson } from '../../api';

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
        const initialData = !initialPerson?.lastRecords?.form100 ?
            getInitialForm100() :
            { ...initialPerson.lastRecords.form100, person: initialPerson };
        if (readonly) {
            return convertIForm100ToIForm100State(initialData);
        }
        return convertIForm100ToIForm100State({
            ...getInitialForm100(),
            person: {
                ...initialData.person,
                lastRecords: {
                    ...initialData.person.lastRecords,
                    form100: {} as IForm100
                },
            }
        });
    }, [initialPerson, readonly]);

    const frontMethods = useForm<IForm100FrontState>({
        defaultValues: initialFrontState,
        resolver: yupResolver(form100FrontSchema),
    });

    const { formState, watch: watchFront, reset: resetFront, trigger: triggerFront } = frontMethods;
    const frontState = watchFront();
    const { person, ...restFrontState } = frontState;
console.log(formState.errors)
    const { records, lastRecords } = person;

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
            const updatedLastForm100Record = { ...lastRecords.form100, ...restFrontState, ...backState };
            const updatedLastBriefRecord = { date: restFrontState.date, fullDiagnosis: backState.fullDiagnosis };
            const updatedRecords = { ...records, form100: [...records.form100, updatedLastForm100Record], brief: [...records.brief, updatedLastBriefRecord] };
            mutate({...person, records: updatedRecords, lastRecords: { ...lastRecords, form100: updatedLastForm100Record, brief: updatedLastBriefRecord }});
        }
    }, [backState, lastRecords, mutate, person, readonly, records, restFrontState, triggerBack])

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

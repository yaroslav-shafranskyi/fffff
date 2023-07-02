import { useCallback, useMemo, useState } from 'react';
import { Card } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocation, useNavigate } from 'react-router-dom';

import { ControlBar } from '../../shared';
import { IForm100, useUpdatePerson, useGetForm100, useUpdateForm100, useGetPerson, Forms } from '../../api';
import { defaultPersonData, form100Url, getInitialForm100 } from '../../constants';

import { form100FrontSchema, form100BackSchema } from './schemas';
import { containerStyles } from './styles';
import { Front, Back } from './components';
import { convertIForm100ToIForm100State } from './convertIForm100ToIForm100State';
import { IForm100BackState, IForm100FrontState } from './types';

export const Form100 = () => {
    const [page, setPage] = useState<number>(0);

    const location = useLocation();
    const { pathname, state } = location;
    const readonly = state?.readonly;

    const navigate = useNavigate();

    const [personId, formId] = useMemo(() => (pathname.split(`${form100Url}/`)[1]?.split('/') ?? []).map(decodeURI), [pathname]);

    const { data: initialPerson } = useGetPerson(personId);
    const initialForm100 = useGetForm100(personId, formId);

    const { front: initialFrontState, back: initialBackState, id } = useMemo(() => {
        const initialData = {
            ...(initialForm100 ?? getInitialForm100()),
            person: initialPerson ?? defaultPersonData
        };
        
        if (readonly) {
            return {
                ...convertIForm100ToIForm100State(initialData),
                id: initialData.id,
            };
        }
        return {
            ...convertIForm100ToIForm100State({
                ...getInitialForm100(),
                person: {
                    ...initialData.person,
                    lastRecords: {
                        ...initialData.person.lastRecords,
                        form100: {} as IForm100
                    },
                }
            }),
            id: initialData.id,
        };
    }, [initialForm100, initialPerson, readonly]);

    const frontMethods = useForm<IForm100FrontState>({
        defaultValues: initialFrontState,
        resolver: yupResolver(form100FrontSchema),
    });

    const { watch: watchFront, reset: resetFront, trigger: triggerFront } = frontMethods;
    const frontState = watchFront();
    const { person, ...restFrontState } = frontState;

    const { records, lastRecords } = person;

    const backMethods = useForm<IForm100BackState>({
        defaultValues: initialBackState,
        resolver: yupResolver(form100BackSchema),
    });

    const { watch: watchBack, reset: resetBack, trigger: triggerBack } = backMethods;

    const backState = watchBack();

    const { mutate: savePerson } = useUpdatePerson();
    const { mutate: saveForm } = useUpdateForm100();

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
            const updatedLastForm100Record = { ...lastRecords.form100, ...restFrontState, ...backState, id };
            const updatedLastBriefRecord = { date: restFrontState.date, fullDiagnosis: backState.fullDiagnosis, id, type: Forms.FORM_100 };
            const updatedRecords = { ...records, form100: [...records.form100, updatedLastForm100Record], brief: [...records.brief, updatedLastBriefRecord]};
            const updatedPerson = {...person, records: updatedRecords, lastRecords: { ...lastRecords, form100: updatedLastForm100Record, brief: updatedLastBriefRecord }};
            savePerson(updatedPerson);
            saveForm({...restFrontState, ...backState, person, id });
        }
    }, [readonly, triggerBack, lastRecords, restFrontState, backState, id, records, person, savePerson, saveForm])

    const handleSubmit = useCallback(async () => {
        if (!page) {
            navigateToBack();
            return;
        }
        await submitForm();
        navigate(-1);
    }, [navigate, navigateToBack, page, submitForm]);

    const handleClear = useCallback(() => {
        resetFront();
        resetBack();
    }, [resetFront, resetBack]);
    console.log({ frontState })
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

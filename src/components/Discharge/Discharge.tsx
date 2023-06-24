import { useCallback, useMemo, useState } from 'react';
import { Container } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { ControlBar } from '../../shared';
import { dischargeUrl, defaultDischargeBackPageState, defaultDischargeFrontPageState } from '../../constants';
import { useGetDischarge, useUpdatePerson, useUpdateDischarge } from '../../api';

import { containerStyles } from './styles';
import { FrontPage } from './FrontPage';
import { DischargeBackPageState, DischargeFrontPageState } from './types';
import { BackPage } from './BackPage';
import { dischargeBackPageSchema, dischargeFrontPageSchema } from './schemas';

export const Discharge = () => {
    const { pathname, state } = useLocation();
    
    const navigate = useNavigate();

    const [personId, formId] = useMemo(() => (pathname.split(`${dischargeUrl}/`)[1]?.split('/') ?? []).map(decodeURI), [pathname]);

    const initialForm = useGetDischarge(personId, formId);

    const { mutate: savePerson } = useUpdatePerson();
    const { mutate: saveForm } = useUpdateDischarge();
    
    const { defaultFrontPageValues, defaultBackPageValues } = useMemo(() => {
        if (!initialForm) {
            return {
                defaultFrontPageValues: defaultDischargeFrontPageState,
                defaultBackPageValues: defaultDischargeBackPageState
            }
        }
        const { doctor, date, recommendations, info, ...rest } = initialForm;
        return {
            defaultFrontPageValues: { ...rest },
            defaultBackPageValues: { doctor, date, recommendations, info },
        };
    }, [initialForm]);

    const { readonly } = (state ?? {})  as { readonly?: boolean };

    const [page, setPage] = useState<number>(0);

    const frontPageMethods = useForm<DischargeFrontPageState>({
        defaultValues: defaultFrontPageValues,
        resolver: yupResolver(dischargeFrontPageSchema),
    });
    const backPageMethods = useForm<DischargeBackPageState>({
        defaultValues: defaultBackPageValues,
        resolver: yupResolver(dischargeBackPageSchema),
    });

    const { reset: frontPageReset, trigger: frontPageTrigger, watch: watchFrontPage } = frontPageMethods;
    const { reset: backPageReset, trigger: backPageTrigger, watch: watchBackPage } = backPageMethods;

    const handleSubmitFrontPage = useCallback(async () => {
        const result = await frontPageTrigger();
            if (result) {
                setPage(1);
            }
    }, [frontPageTrigger]);

    const handleSubmitBackPage = useCallback(async () => {
        const result = await backPageTrigger();
        if (!result) {
            return;
        }
        const { person, ...frontPageState } = watchFrontPage();
        const backPageState = watchBackPage();

        const dischargeRecord = {
            ...frontPageState,
            ...backPageState,                    
        };

        const updatedPerson = {
            ...person,
            id: person.id || `${Math.round(Math.random() * 1000000)}`,
            lastRecords: {
                ...person.lastRecords,
                discharge: dischargeRecord,
                brief: {
                    fullDiagnosis: dischargeRecord.fullDiagnosis,
                    date: dischargeRecord.date,
                },
            },
            records: {
                ...person.records,
                discharge: [ ...person.records.discharge, dischargeRecord ]
            },
        };

        savePerson(updatedPerson);
        saveForm({ ...dischargeRecord, person: updatedPerson, id: String(person.records.discharge.length + 1) })
        navigate('/')
    }, [backPageTrigger, navigate, saveForm, savePerson, watchBackPage, watchFrontPage]);

    const handleSubmit = useCallback(() => {
        if (page === 0) {
            handleSubmitFrontPage();
            return;
        }
        handleSubmitBackPage();
    }, [handleSubmitBackPage, handleSubmitFrontPage, page])

    const handleReset = useCallback(() => {
        if (page === 0) {
            frontPageReset();
            return;
        }
        backPageReset();
    }, [backPageReset, frontPageReset, page]);

    const handleGoBack = useCallback(() => {
        if (page === 0) {
            navigate('/');
            return;
        }
        setPage(0);
    }, [navigate, page])

    return (
        <Container maxWidth={false} sx={containerStyles}>
            <ControlBar
                submitButtonText={!page ? 'Далі' : 'Зберегти'}
                onClear={handleReset}
                onSubmit={handleSubmit}
                onBack={handleGoBack}
            />
                {page === 0 ?
                    <FormProvider { ...frontPageMethods }>
                        <FrontPage readonly={readonly} />
                    </FormProvider> :
                    <FormProvider { ...backPageMethods}>
                        <BackPage readonly={readonly} />
                    </FormProvider>
                }
        </Container>
    );
};

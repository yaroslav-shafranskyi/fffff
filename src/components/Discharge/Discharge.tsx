import { useCallback, useState } from 'react';
import { Container } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { ControlBar } from '../../shared';

import { containerStyles } from './styles';
import { defaultDischargeBackPageState, defaultDischargeFrontPageState } from './constants';
import { FrontPage } from './FrontPage';
import { DischargeBackPageState, DischargeFrontPageState } from './types';
import { BackPage } from './BackPage';

export const Discharge = () => {
    const { pathname, state } = useLocation();
    const { readonly } = (state ?? {})  as { readonly?: boolean };

    const [page, setPage] = useState<number>(0);

    const frontPageMethods = useForm<DischargeFrontPageState>({
        defaultValues: defaultDischargeFrontPageState,
    });
    const backPageMethods = useForm<DischargeBackPageState>({
        defaultValues: defaultDischargeBackPageState,
    })


    const { reset: frontPageReset, trigger: frontPageTrigger } = frontPageMethods;
    const { reset: backPageReset, trigger: backPageTrigger } = backPageMethods;

    const handleSubmitFrontPage = useCallback(async () => {
        const result = await frontPageTrigger();
        console.log({ result })
            if (result) {
                setPage(1);
            }
    }, [frontPageTrigger]);

    const handleSubmitBackPage = useCallback(async () => {
        await backPageTrigger();
    }, [backPageTrigger]);

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

    return (
        <Container maxWidth={false} sx={containerStyles}>
            <ControlBar
                submitButtonText={!page ? 'Далі' : 'Зберегти'}
                onClear={handleReset}
                onSubmit={handleSubmit}
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

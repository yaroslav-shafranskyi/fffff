import { FC, useCallback, useEffect, useMemo, useState } from 'react';
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
import { IRecord } from '../../api';

export const Form100: FC<IForm100Props> = (props) => {
    const { data, readonly } = props;

    const [page, setPage] = useState<number>(0);

    const navigate = useNavigate()

    const { front: initialFrontState, back: initialBackState} = useMemo(() => convertIForm100ToIForm100State(data), [data]);

    const frontMethods = useForm<IForm100FrontState>({
        defaultValues: initialFrontState,
        resolver: yupResolver(form100FrontSchema),
    });

    const { watch: watchFront, setValue: setFrontValue, reset: resetFront, trigger: triggerFront } = frontMethods;
    const { records, lastRecord } = watchFront('person');

    const backMethods = useForm<IForm100BackState>({
        defaultValues: initialBackState,
        resolver: yupResolver(form100BackSchema),
    });

    const { reset: resetBack, trigger: triggerBack } = backMethods;

    useEffect(() => {
        if (!readonly) {
            setFrontValue('person.lastRecord', {} as IRecord);
        }
    }, [readonly, setFrontValue]);

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
        if (!result) {
            return;
        }
        setFrontValue('person.records', [...records, lastRecord]);
    }, [lastRecord, readonly, records, setFrontValue, triggerBack])

    const handleSubmit = useCallback(async () => {
        if (!page) {
            navigateToBack();
            return;
        }
        submitForm();
    }, [navigateToBack, page, submitForm]);

    const handleClear = useCallback(() => {
        resetFront();
        resetBack();
    }, [resetFront, resetBack]);

    return (
        <Card sx={containerStyles}>
            <ControlBar
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

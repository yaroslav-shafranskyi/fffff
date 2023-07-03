import { useCallback, useMemo, useState, FC } from 'react';
import { Card } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocation, useNavigate } from 'react-router-dom';

import { ControlBar } from '../../shared';
import { IForm100, useGetForm100, useUpdateForm100 } from '../../api';
import { form100Url, getInitialForm100 } from '../../constants';

import { form100Schema } from './schemas';
import { containerStyles } from './styles';
import { Front, Back } from './components';

export const Form100 = () => {
    const location = useLocation();
    const { pathname, state } = location;
    const readonly = state?.readonly;

    const [personId, formId] = useMemo(() => (pathname.split(`${form100Url}/`)[1]?.split('/') ?? []).map(decodeURI), [pathname]);

    const { form100: initialForm100 } = useGetForm100(personId, formId);

    const { mutate: saveForm } = useUpdateForm100();

    const submitForm = useCallback((form: IForm100) => {
        if (readonly) {
            return;
        }

        if (form.person.birthDate) {
            saveForm(form);
            return;
        } 

        const { tokenNumber } = form.person;
        const tokenNumberWithoutSpaces = tokenNumber.split(' ').join('');
        const birthDate = new Date(tokenNumberWithoutSpaces);
        const isValidDate = !Number.isNaN(birthDate.getTime());
        saveForm({ ...form,
            person: {
                ...form.person,
                birthDate: isValidDate ? birthDate : undefined 
            }
        });
    }, [readonly, saveForm]);

    return <Form100Page initialForm100={initialForm100} readonly={readonly} onSubmit={submitForm} />
};

export const Form100Page: FC<{ readonly?: boolean; initialForm100: IForm100; onSubmit: (f: IForm100) => void; }> = ({ readonly, initialForm100, onSubmit }) => {
    const [page, setPage] = useState<number>(0);

    const navigate = useNavigate();

    const methods = useForm<IForm100>({
        defaultValues: getInitialForm100(),
        values: initialForm100,
        resolver: yupResolver(form100Schema),
    });

    const { reset, trigger, handleSubmit: handleSubmitForm100 } = methods;

    const handleGoBack = useCallback(() => {
        if (!page) {
            navigate(-1);
            return;
        }
        setPage(0);
    }, [navigate, page]);

    const navigateToBack = useCallback(async () => {
        const result = await trigger();
            if (result) {
                setPage(1);
            }
    }, [trigger]);

    const handleSubmit = useCallback(() => {
        if (!page) {
            navigateToBack();
            return;
        }
        handleSubmitForm100(onSubmit);
    }, [handleSubmitForm100, navigateToBack, page, onSubmit]);

    return (
        <Card sx={containerStyles}>
            <ControlBar
                submitButtonText={!page ? 'Далі' : undefined}
                onClear={reset}
                onSubmit={handleSubmit}
                onBack={handleGoBack}
            />
            {!page ? 
                <FormProvider {...methods}>
                    <Front readonly={readonly} />
                </FormProvider> : 
                <FormProvider {...methods}>
                    <Back />
                </FormProvider>}
        </Card>
    );
};

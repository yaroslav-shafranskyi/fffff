import { ChangeEvent, useCallback, useMemo } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { FieldPath, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { conclusionUrl, defaultPersonData } from '../../constants';
import { Forms, IConclusion, IPerson, useGetConclusion, useGetPerson, useUpdateConclusion, useUpdatePerson } from '../../api';
import { ControlBar, DateInputWithTextMonth, Input, InputWithTextIndent } from '../../shared';

import { FormHeader, MinistryOrder } from '../CommonFormHeader';
import { boldTextStyles, containerStyles, formContentStyles, formWrapperStyles } from '../commonFormStyles';

import { conclusionSchema } from './schemas';
import { contentWrapperStyles, footerStyles, mpWrapperStyles, signatureInputWrapperStyles, signatureStyles, signaturesWrapperStyles, titleWrapperStyles } from './styles';
import { PersonInfo } from './PersonInfo';

export const Conclusion = () => {
    const { pathname, state } = useLocation();
    const readonly = state?.readonly;

    const navigate = useNavigate();

    const [personId, formId] = useMemo(() => (pathname.split(`${conclusionUrl}/`)[1]?.split('/') ?? []).map(decodeURI), [pathname]);

    const initialForm = useGetConclusion(personId, formId);
    const { data: initialPerson } = useGetPerson(personId);

    const { mutate: savePerson } = useUpdatePerson();
    const { mutate: saveForm } = useUpdateConclusion();

    const defaultValues = useMemo(() => {
        const { id, fullName, birthDate } = initialPerson ?? defaultPersonData;
        return { ...initialForm, person: { id, fullName, birthDate }};
    }, [initialForm, initialPerson]);

    const methods = useForm<IConclusion>({
        defaultValues,
        resolver: yupResolver(conclusionSchema)
    });

    const { formState, register, watch, setValue, reset, handleSubmit, clearErrors } = methods;
    const errors = formState.errors;

    const handleInputChange = useCallback((field: FieldPath<IConclusion>) =>
        (event: ChangeEvent<HTMLInputElement>) => {
            if (readonly) {
                return;
            }
            setValue(field, event.target.value);
            clearErrors(field);
        }, [clearErrors, readonly, setValue]);
    
    const handleDateChange = useCallback((date?: Date) => {
        if (readonly || !date) {
            return;
        }
        setValue('date', date.getTime());
        clearErrors('date');
    }, [clearErrors, readonly, setValue]);

    const submitForm = useCallback((data: IConclusion) => {
        const { diagnosis, id, date, person } = data;
        
        const briefRecord = { fullDiagnosis: diagnosis, id, date, type: Forms.CONCLUSION };

        const updatedPerson: IPerson = {
            ...(initialPerson ?? defaultPersonData),
            ...person,
            records: {
                ...(initialPerson ?? defaultPersonData)?.records,
                conclusion: [...initialPerson?.records?.conclusion ?? [], data],
                brief: [...initialPerson?.records?.brief ?? [], briefRecord],
            },
            lastRecords: {
                ...(initialPerson ?? defaultPersonData)?.lastRecords,
                brief: briefRecord,
                conclusion: data,
            },
        };

        saveForm(data);
        savePerson(updatedPerson);
        navigate(-1);
    }, [initialPerson, saveForm, savePerson, navigate]);

    const dateError = errors?.date?.message;

    return (
        <Container maxWidth={false} sx={containerStyles}>
            <ControlBar
                onClear={reset}
                onSubmit={handleSubmit(submitForm)}
            />
            <Box sx={formWrapperStyles}>
                <MinistryOrder />
                <Box sx={formContentStyles}>
                    <FormProvider {...methods}>
                        <FormHeader readonly={readonly} formNumber='028/о' />
                    </FormProvider>
                    <Box sx={titleWrapperStyles}>
                        <Typography variant='h5' sx={boldTextStyles}>
                            Консультаційний висновок спеціаліста
                        </Typography>
                    </Box>
                    <Box sx={contentWrapperStyles}>
                        <InputWithTextIndent
                            title='1. Найменування закладу охорони здоров’я, який направив пацієнта на консультацію'
                            inputProps={{
                                ...register('sender'),
                                error: errors?.sender?.message,
                                fullWidth: true,
                                multiline: true,
                                rows: 2,
                                value: watch('sender'),
                                onChange: handleInputChange('sender')
                            }}
                        />
                        <FormProvider {...methods}>
                            <PersonInfo readonly={readonly} />
                        </FormProvider>
                        <InputWithTextIndent
                            title='4. Спеціальність, прізвище, ім’я, по батькові лікаря-консультанта'
                            inputProps={{
                                ...register('doctor'),
                                error: errors?.doctor?.message,
                                fullWidth: true,
                                multiline: true,
                                rows: 2,
                                value: watch('doctor'),
                                onChange: handleInputChange('doctor')
                            }}
                        />
                        <InputWithTextIndent
                            title='5. Результати лабораторного дослідження'
                            inputProps={{
                                ...register('labResults'),
                                error: errors?.labResults?.message,
                                fullWidth: true,
                                multiline: true,
                                rows: 4,
                                value: watch('labResults'),
                                onChange: handleInputChange('labResults')
                            }}
                        />
                        <InputWithTextIndent
                            title='6. Результати функціонального, рентгенологічного та інших спеціальних досліджень: '
                            inputProps={{
                                ...register('researchResults'),
                                error: errors?.researchResults?.message,
                                fullWidth: true,
                                multiline: true,
                                rows: 3,
                                value: watch('researchResults'),
                                onChange: handleInputChange('researchResults')
                            }}
                        />
                        <InputWithTextIndent
                            title='7. Висновок спеціаліста (встановлений діагноз)'
                            inputProps={{
                                ...register('diagnosis'),
                                error: errors?.diagnosis?.message,
                                fullWidth: true,
                                multiline: true,
                                rows: 3,
                                value: watch('diagnosis'),
                                onChange: handleInputChange('diagnosis')
                            }}
                        />
                        <InputWithTextIndent
                            title='8. Рекомендації:'
                            inputProps={{
                                ...register('recommendations'),
                                error: errors?.recommendations?.message,
                                fullWidth: true,
                                multiline: true,
                                rows: 3,
                                value: watch('recommendations'),
                                onChange: handleInputChange('recommendations')
                            }}
                        />
                        <Box sx={footerStyles}>
                            <Box>
                                <DateInputWithTextMonth
                                    value={watch('date')}
                                    onChange={handleDateChange}
                                />
                                {dateError !== undefined && <Typography color='error'>{dateError}</Typography>}
                            </Box>
                            <Box sx={mpWrapperStyles}>
                                <Typography>М.П.</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={signaturesWrapperStyles}>
                        <Box sx={signatureStyles}>
                            <Typography>
                                Лікар-консультант
                            </Typography>
                            <Box sx={signatureInputWrapperStyles}>
                                <Input fullWidth={true} />
                                <Typography sx={{ textAlign: 'center' }} variant='caption'>(П.І.Б.)(підпис)</Typography>
                            </Box>
                        </Box>
                        <Box sx={signatureStyles}>
                            <Typography sx={{ maxWidth: '192px' }}>
                                Завідувач поліклініки або стаціонарного відділення
                            </Typography>
                            <Box sx={signatureInputWrapperStyles}>
                                <Input
                                    {...register('headOfTheClinic')}
                                    fullWidth={true}
                                    value={watch('headOfTheClinic')}
                                    onChange={handleInputChange('headOfTheClinic')}
                                />
                                <Typography sx={{ textAlign: 'center' }} variant='caption'>(П.І.Б.)(підпис)</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

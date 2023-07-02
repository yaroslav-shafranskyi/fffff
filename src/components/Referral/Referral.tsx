import { ChangeEvent, useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FieldPath, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Container, Typography } from "@mui/material";

import { Forms, IPerson, IReferral, useGetPerson, useGetReferral, useUpdatePerson, useUpdateReferral } from "../../api";
import { defaultPersonData, defaultReferralData, referralUrl } from "../../constants";
import { ControlBar, Input, DateInputWithTextMonth, InputWithTextIndent } from "../../shared";
import { Trident } from "../../assets";

import { referralSchema } from "./schemas";
import {
    codeWrapper,
    containerStyles,
    headerInputPropsSx,
    headerStyles,
    inlineInputWrapper,
    mainHeaderWrapper,
    militaryBaseWrapperStyles,
    numberInputPropsSx,
    numberInputStyles,
    numberWrapperStyles,
    patientInputPropsSx
} from "./styles";

export const Referral = () => {
    const { pathname, state } = useLocation();
    const readonly = state?.readonly as boolean;

    const navigate = useNavigate();

    const [initialPersonId, initialFormId] = useMemo(() => (pathname.split(`${referralUrl}/`)[1]?.split('/') ?? []).map(decodeURI), [pathname]);

    const { data: initialPerson } = useGetPerson(initialPersonId);
    const initialForm = useGetReferral(initialPersonId, initialFormId);

    const { mutate: saveForm } = useUpdateReferral();
    const { mutate: savePerson } = useUpdatePerson();

    const defaultValues = useMemo(() => ({
        ...(initialForm ?? defaultReferralData),
        patient: (initialPerson ?? defaultPersonData).fullName,
        personId: (initialPerson ?? defaultPersonData).id,
    }), [initialForm, initialPerson]);

    const { formState, register, watch, setValue, clearErrors, reset, handleSubmit } = useForm<IReferral>({
        defaultValues,
        resolver: yupResolver(referralSchema),
    });

    const { errors } = formState;

    const handleInputChange = useCallback((field: FieldPath<IReferral>) => (event: ChangeEvent<HTMLInputElement>) => {
        if (readonly) {
            return;
        }
        setValue(field, event.target.value);
        clearErrors(field);
    }, [readonly, setValue, clearErrors]);

    const handleDateChange = useCallback((date?: Date) => {
        if (!date || readonly) {
            return;
        }
        setValue('date', date);
        clearErrors('date');
    }, [readonly, setValue, clearErrors]);

    const dateError = errors?.date?.message;

    const submitForm = useCallback((data: IReferral) => {
        if (readonly) {
            return;
        }
        const { date, id, diagnosis, personId, patient } = data;

        saveForm(data);

        const newBrief = { date, id, fullDiagnosis: diagnosis, type: Forms.REFERRAL };
        const updatedPerson: IPerson = {
            ...initialPerson,
            id: personId,
            fullName: patient,
            records: {
                ...initialPerson?.records ?? { form100: [], discharge: [] },
                referral: [
                    ...initialPerson?.records?.referral ?? [],
                    data
                ],
                brief: [
                    ...initialPerson?.records?.brief ?? [],
                    newBrief,
                ],
            },
            lastRecords: {
                ...initialPerson?.lastRecords ?? {},
                referral: data,
                brief: newBrief,
            },
        } as IPerson;

        savePerson(updatedPerson);

        navigate(-1);
    }, [initialPerson, navigate, readonly, saveForm, savePerson]);

    return (
        <Container maxWidth={false} sx={containerStyles}>
            <ControlBar onClear={reset} onSubmit={handleSubmit(submitForm)} />
                <Box>
                    <Box sx={headerStyles}>
                        <Box sx={militaryBaseWrapperStyles}>
                            <Trident />
                            <Typography>
                                МІНІСТЕРСТВО ОБОРОНИ УКРАЇНИ
                            </Typography>
                            <Typography>
                                ВІЙСЬКОВА ЧАСТИНА
                            </Typography>
                            <Input
                                {...register('militaryBase')}
                                value={watch('militaryBase')}
                                fullWidth={true}
                                placeholder='Номер в/ч'
                                inputProps={{
                                    sx: headerInputPropsSx,
                                }}
                                error={errors?.militaryBase?.message}
                                onChange={handleInputChange('militaryBase')}
                            />
                            <Box sx={codeWrapper}>
                                <Typography>Код</Typography>
                                <Input
                                    {...register('code')}
                                    value={watch('code')}
                                    error={errors?.code?.message}
                                    onChange={handleInputChange('code')}
                                />
                            </Box>
                            <Box>
                                <DateInputWithTextMonth value={watch('date')} onChange={handleDateChange} />
                                {dateError !== undefined && <Typography color='error'>{dateError}</Typography>}
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <Input
                                    {...register('militaryBaseAddress')}
                                    value={watch('militaryBaseAddress')}
                                    multiline={true}
                                    rows={3}
                                    placeholder='Адреса в/ч'
                                    fullWidth={true}
                                    inputProps={{
                                        sx: headerInputPropsSx,
                                    }}
                                    error={errors?.militaryBaseAddress?.message}
                                    onChange={handleInputChange('militaryBaseAddress')}
                                />
                            </Box>
                        </Box>
                        <Box sx={mainHeaderWrapper}>
                            <Box sx={numberWrapperStyles}>
                                <Typography sx={{ fontWeight: 'bold' }} variant='h5'>
                                    НАПРАВЛЕННЯ №
                                </Typography>
                                <Input
                                    {...register('number')}
                                    value={watch('number')}
                                    error={errors?.number?.message}
                                    sx={numberInputStyles}
                                    inputProps={{
                                        sx: numberInputPropsSx
                                    }}
                                    onChange={handleInputChange('number')}
                                />
                            </Box>
                            <Box sx={inlineInputWrapper}>
                                <Typography>
                                    Командиру в/ч
                                </Typography>
                                <Input
                                    {...register('receiver')}
                                    error={errors?.receiver?.message}
                                    fullWidth={true}
                                    value={watch('receiver')}
                                    onChange={handleInputChange('receiver')}
                                />
                            </Box>
                            <Typography>
                                Направляється на стаціонарне лікування
                            </Typography>
                            <Input
                                {...register('patient')}
                                error={errors?.patient?.message}
                                multiline={true}
                                rows={2}
                                fullWidth={true}
                                inputProps={{
                                    sx: patientInputPropsSx,
                                }}
                                value={watch('patient')}
                                onChange={handleInputChange('patient')}
                            />
                        </Box>
                    </Box>
                        <InputWithTextIndent
                            title='ДІАГНОЗ:'
                            inputProps={{
                            ...register('diagnosis'),
                            error: errors?.diagnosis?.message,
                            value: watch('diagnosis'),
                            multiline: true,
                            rows: 2,
                            fullWidth: true,
                            onChange: handleInputChange('diagnosis'),
                            }}
                        />
                        <Input
                            {...register('commander.position')}
                            error={errors?.commander?.position?.message}
                            value={watch('commander.position')}
                            fullWidth={true}
                            inputProps={{
                                sx: {
                                    fontWeight: 'bold'
                                }
                            }}
                            placeholder='Повна назва посади командира в/ч'
                            onChange={handleInputChange('commander.position')}
                        />
                        <Input
                            {...register('commander.fullName')}
                            error={errors?.commander?.fullName?.message}
                            value={watch('commander.fullName')}
                            fullWidth={true}
                            inputProps={{
                                sx: {
                                    fontWeight: 'bold'
                                }
                            }}
                            placeholder='Звання та ПІБ командира в/ч'
                            onChange={handleInputChange('commander.fullName')}
                        />
                        <Input
                            {...register('medicalCommander.position')}
                            error={errors?.medicalCommander?.position?.message}
                            value={watch('medicalCommander.position')}
                            fullWidth={true}
                            inputProps={{
                                sx: {
                                    fontWeight: 'bold'
                                }
                            }}
                            placeholder='Повна назва посади начальника мед. служби в/ч'
                            onChange={handleInputChange('medicalCommander.position')}
                        />
                        <Input
                            {...register('medicalCommander.fullName')}
                            error={errors?.medicalCommander?.fullName?.message}
                            value={watch('medicalCommander.fullName')}
                            fullWidth={true}
                            inputProps={{
                                sx: {
                                    fontWeight: 'bold'
                                }
                            }}
                            placeholder='Звання і ПІБ начальника мед. служби в/ч'
                            onChange={handleInputChange('medicalCommander.fullName')}
                        />
                </Box>
        </Container>
    );
};

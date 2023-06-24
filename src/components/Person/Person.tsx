import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocation } from 'react-router-dom';
import {
    Card,
    Typography,
    Box,
    Radio,
    RadioGroup,
    FormControlLabel,
    Button,
    FormLabel
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ArmyRank, Gender, IBriefRecord, IPerson, useGetPerson, useUpdatePerson } from '../../api';
import { Select, Input, ControlBar, DatePicker } from '../../shared';
import { defaultPersonData } from '../../constants';
import { REQUIRED_FIELD_MESSAGE, personPageSchema } from '../../schemas';

import {
    cardStyles,
    inputPropsSx,
    radioStyles,
    genderWrapperStyles,
    recordsTitleWrapperStyles,
    newRecordWrapperStyles,
    newRecordLabelStyles,
    newRecordContentStyles,
    newRecordButtonStyles,
    fullWidthStyles,
    infoWrapperStyles,
    infoLeftSectionRowStyles,
    infoLeftSectionStyles
} from './styles';

export const Person = () => {
    const { pathname } = useLocation() ?? {};

    const personId = useMemo(() => decodeURI(pathname?.split('/persons/')?.[1]), [pathname]);

    const navigate = useNavigate();

    const { data: person } = useGetPerson(personId);

    const { mutate: savePerson } = useUpdatePerson();

    const initialPerson = useMemo(() => person ?? defaultPersonData, [person]);

    const {
        formState,
        register,
        watch,
        setValue,
        handleSubmit,
    } = useForm<IPerson>({
        defaultValues: initialPerson,
        resolver: yupResolver(personPageSchema),
    });

    const records = watch('records');
    const lastRecords = watch('lastRecords');
    const gender = watch('gender');
    
    const { errors } = formState;

    const handleInputChange = useCallback((key: keyof IPerson) => (event: ChangeEvent<HTMLInputElement>) => {
        setValue(key, event.target.value);
    }, [setValue]);

    const handleGenderChange = useCallback((value: Gender) => (_event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
        if (checked) {
        setValue('gender', value);
        }
    }, [setValue]);

    const handleDateChange = useCallback((key: 'birthDate' | 'lastRecords.brief.date') => (date?: Date) => {
        if (date !== undefined) {
            setValue(key, date)
        }
    }, [setValue]);

    const submitUserChanges = (newPerson: IPerson) => {
        savePerson(newPerson);
        navigate('/');
    };
    console.log({ person });
    return (
        <Card sx={cardStyles}>
            <ControlBar onSubmit={handleSubmit(submitUserChanges)} />
            <Typography variant='h4'>Інформація про військовослужбовця</Typography>
            <Box sx={infoWrapperStyles}>
                <Box sx={infoLeftSectionStyles}>
                    <Box sx={infoLeftSectionRowStyles}>
                        <Box sx={fullWidthStyles}>
                            <Input
                                label='ПІБ'
                                variant='outlined'
                                inputProps={{ sx: inputPropsSx }}
                                error={errors.fullName?.message}
                                fullWidth={true}
                                {...register('fullName')}
                                onChange={handleInputChange('fullName')}
                                value={watch('fullName')}
                            />
                        </Box>
                        <Box sx={fullWidthStyles}>
                            <Select
                                label='Звання'
                                variant='outlined'
                                inputProps={{ sx: inputPropsSx }}
                                options={Object.values(ArmyRank)}
                                error={errors.rank?.message}
                                {...register('rank')}
                                value={watch('rank')}
                            />
                        </Box>
                    </Box>
                    <Box sx={infoLeftSectionRowStyles}>
                        <Box sx={fullWidthStyles}>
                            <Input
                                label='Посвідчення особи'
                                variant='outlined'
                                inputProps={{ sx: inputPropsSx }}
                                error={errors.id?.message}
                                fullWidth={true}
                                {...register('id')}
                                onChange={handleInputChange('id')}
                                value={watch('id')}
                            />
                        </Box>
                        <Box sx={fullWidthStyles}>
                            <Input
                                label='Особистий номер'
                                variant='outlined'
                                inputProps={{ sx: inputPropsSx }}
                                error={errors.tokenNumber?.message}
                                fullWidth={true}
                                {...register('tokenNumber')}
                                onChange={handleInputChange('tokenNumber')}
                                value={watch('tokenNumber')}
                            />
                        </Box>
                    </Box>
                    <Box sx={infoLeftSectionRowStyles}>
                        <Box sx={fullWidthStyles}>
                            <DatePicker
                                label="Дата народження"
                                value={watch('birthDate')}
                                sx={fullWidthStyles}
                                onChange={handleDateChange('birthDate')}
                            />
                            {errors.birthDate?.message !== undefined && (
                                <Typography color='error'>{REQUIRED_FIELD_MESSAGE}</Typography>
                            )}
                        </Box>
                        <Box sx={fullWidthStyles}>
                            <Input
                                label='Телефон'
                                variant='outlined'
                                inputProps={{ sx: inputPropsSx }}
                                fullWidth={true}
                                {...register('phoneNumber')}
                                onChange={handleInputChange('phoneNumber')}
                                value={watch('phoneNumber')}
                            />
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <Box sx={fullWidthStyles}>
                        <Input
                            label='Військова частина'
                            variant='outlined'
                            inputProps={{ sx: inputPropsSx }}
                            error={errors.militaryBase?.message}
                            fullWidth={true}
                            {...register('militaryBase')}
                            onChange={handleInputChange('militaryBase')}
                            value={watch('militaryBase')}
                        />
                    </Box>
                    <Box  sx={genderWrapperStyles}>
                        <Typography>Стать</Typography>
                        <RadioGroup>
                            <FormControlLabel
                                value={Gender.MALE}
                                control={<Radio checked={gender === Gender.MALE} onChange={handleGenderChange(Gender.MALE)} />}
                                label="Чоловік"
                                sx={radioStyles}
                            />
                            <FormControlLabel
                                value={Gender.FEMALE}
                                control={<Radio checked={gender === Gender.FEMALE} onChange={handleGenderChange(Gender.FEMALE)} />}
                                label="Жінка"
                                sx={radioStyles}
                            />
                        </RadioGroup>
                        {errors.gender?.message && <Typography color='error'>{REQUIRED_FIELD_MESSAGE}</Typography>}
                    </Box>
                </Box>
            </Box>
       </Card>
    );
}
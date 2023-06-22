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
    Accordion,
    AccordionSummary,
    Button,
    FormLabel
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ArmyRank, Gender, IBriefRecord, IPerson, IRecords, useGetPerson, useUpdatePerson } from '../../api';
import { Select, Input, ControlBar, DatePicker } from '../../shared';
import { defaultPersonData } from '../../constants';
import { formatDate } from '../../helpers';
import { REQUIRED_FIELD_MESSAGE, personPageSchema } from '../../schemas';

import {
    cardStyles,
    inputPropsSx,
    fullNameRowStyles,
    radioStyles,
    genderWrapperStyles,
    idRowStyles,
    recordsTitleWrapperStyles,
    newRecordWrapperStyles,
    newRecordLabelStyles,
    newRecordContentStyles,
    newRecordButtonStyles,
    fullWidthStyles
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
        reset,
    } = useForm<IPerson>({
        defaultValues: initialPerson,
        resolver: yupResolver(personPageSchema),
    });

    const records = watch('records');
    const lastRecords = watch('lastRecords');
    const gender = watch('gender');
    
    const { errors } = formState;

    const [newRecord, setNewRecord] = useState<IBriefRecord>();

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

    const addNewRecord = useCallback(() => {
        setNewRecord({ date: new Date(), fullDiagnosis: '' });
        setValue('lastRecords.brief', {} as IBriefRecord);
    }, [setValue]);

    const saveNewRecord = useCallback(() => {
        if (!newRecord) {
            return;
        }
        setValue('records', { ...records, brief: [...records.brief, newRecord] });
        setValue('lastRecords.brief', newRecord);
        setNewRecord(undefined);
    }, [newRecord, records, setValue]);

    const submitUserChanges = (newPerson: IPerson) => {
        savePerson(newPerson);
        navigate('/');
    };

    const handleClear = useCallback(() => {
        reset();
        setNewRecord(undefined);
    }, [reset])

    const hasRecords = useMemo(() => Object.values(records).some(value => value.length > 0), [records]);

    return (
        <Card sx={cardStyles}>
            <ControlBar onClear={handleClear} onSubmit={handleSubmit(submitUserChanges)} />
            <Typography variant='h4'>Інформація про військовослужбовця</Typography>
            <Box sx={fullNameRowStyles}>
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
            </Box>
            <Box sx={idRowStyles}>
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
                <Box sx={fullWidthStyles}>
                    <RadioGroup sx={genderWrapperStyles}>
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
            <Box sx={idRowStyles}>
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
                <Box sx={fullWidthStyles}>
                    <DatePicker label="Дата народження" value={watch('birthDate')} onChange={handleDateChange('birthDate')} />
                    {errors.birthDate?.message !== undefined && (
                        <Typography color='error'>{REQUIRED_FIELD_MESSAGE}</Typography>
                    )}
                </Box>
            </Box>
            <Box sx={recordsTitleWrapperStyles}>
                <Typography variant='h5'>Звернення</Typography>
                <Button onClick={addNewRecord}>Додати</Button>
            </Box>
            {newRecord && (
                <Box sx={newRecordWrapperStyles}>
                    <FormLabel sx={newRecordLabelStyles}>Новий запис</FormLabel>
                    <Box sx={newRecordContentStyles}>
                        <Typography>Дата:</Typography>
                        <DatePicker value={watch('lastRecords.brief.date')} onChange={handleDateChange('lastRecords.brief.date')} />
                    </Box>
                    <Box sx={newRecordContentStyles}>
                        <Typography>Повний діагноз:</Typography>
                        <Input
                            variant='outlined'
                            fullWidth={true}
                            multiline={true}
                            {...register('lastRecords.brief.fullDiagnosis')}
                            value={watch('lastRecords.brief.fullDiagnosis')}
                            onChange={handleInputChange('lastRecords.brief.fullDiagnosis' as keyof IPerson)}
                        />
                    </Box>
                    <Button
                        variant='contained'
                        sx={newRecordButtonStyles}
                        disabled={!lastRecords.brief.date || !lastRecords.brief.fullDiagnosis}
                        onClick={saveNewRecord}
                    >
                        Зберегти
                    </Button>
                </Box>
            )}
            {!hasRecords && !newRecord && (
                <Typography color='textSecondary'>
                    Звернень немає. Натисніть "Додати", щоб внести.
                </Typography>
            )}
        </Card>
    );
}
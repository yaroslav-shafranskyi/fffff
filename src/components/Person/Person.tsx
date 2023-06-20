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
import { DateTime } from 'luxon';
import { useNavigate } from 'react-router-dom';

import { ArmyRank, Gender, IPerson, IRecord, useGetPerson, useUpdatePerson } from '../../api';
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
    const lastRecord = watch('lastRecord');
    const gender = watch('gender');
    
    const { errors } = formState;

    const [newRecord, setNewRecord] = useState<Pick<IRecord, 'date' | 'fullDiagnosis'>>();

    const handleInputChange = useCallback((key: keyof IPerson) => (event: ChangeEvent<HTMLInputElement>) => {
        setValue(key, event.target.value);
    }, [setValue]);

    const handleGenderChange = useCallback((value: Gender) => (_event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
        if (checked) {
        setValue('gender', value);
        }
    }, [setValue]);

    const handleDateChange = useCallback((key: 'birthDate' | 'lastRecord.date') => (dateTime: DateTime | null) => {
        if (dateTime !== null) {
            setValue(key, dateTime.toJSDate())
        }
    }, [setValue]);

    const addNewRecord = useCallback(() => {
        setNewRecord({ date: new Date(), fullDiagnosis: '' });
        setValue('lastRecord', {} as IRecord);
    }, [setValue]);

    const saveNewRecord = useCallback(() => {
        setValue('records', [...records, newRecord as IRecord]);
        setValue('lastRecord', newRecord as IRecord);
        setNewRecord(undefined);
    }, [newRecord, records, setValue]);

    const submitUserChanges = (newPerson: IPerson) => {
        savePerson(newPerson);
        navigate('/');
    };

    const getDateTimeValue = (date?: Date) => !date ? null : DateTime.fromJSDate(date);

    return (
        <Card sx={cardStyles}>
            <ControlBar onClear={reset} onSubmit={handleSubmit(submitUserChanges)} />
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
                    <DatePicker label="Дата народження" value={getDateTimeValue(watch('birthDate'))} onChange={handleDateChange('birthDate')} />
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
                        <DatePicker value={getDateTimeValue(watch('lastRecord.date'))} onChange={handleDateChange('lastRecord.date')} />
                    </Box>
                    <Box sx={newRecordContentStyles}>
                        <Typography>Повний діагноз:</Typography>
                        <Input
                            variant='outlined'
                            fullWidth={true}
                            multiline={true}
                            {...register('lastRecord.fullDiagnosis')}
                            value={watch('lastRecord.fullDiagnosis')}
                            onChange={handleInputChange('lastRecord.fullDiagnosis' as keyof IPerson)}
                        />
                    </Box>
                    <Button
                        variant='contained'
                        sx={newRecordButtonStyles}
                        disabled={!lastRecord.date || !lastRecord.fullDiagnosis}
                        onClick={saveNewRecord}
                    >
                        Зберегти
                    </Button>
                </Box>
            )}
            {!records?.length && !newRecord && (
                <Typography color='textSecondary'>
                    Звернень немає. Натисніть "Додати", щоб внести.
                </Typography>
            )}
            {(records ?? []).map(({ fullDiagnosis, date }) => (
                <Accordion key={date.getTime()}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        {formatDate(date, true)}
                    </AccordionSummary>
                    <AccordionSummary>
                        <Typography>
                            {fullDiagnosis}
                        </Typography>
                    </AccordionSummary>
                </Accordion>
            ))}
        </Card>
    );
}
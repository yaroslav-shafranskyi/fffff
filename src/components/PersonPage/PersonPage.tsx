import { ChangeEvent, useCallback, useMemo, useState, MouseEvent, Fragment } from 'react';
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
    Menu,
    MenuItem,
    Container,
} from '@mui/material';
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineDot,
    TimelineConnector,
    TimelineContent,
    TimelineOppositeContent,
} from '@mui/lab';
import { ArrowRight as OpenMenuIcon, ArrowForwardIos as ArrowForwardIosIcon } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ArmyRank, Forms, Gender, IBriefRecord, IPerson, useGetPerson, useUpdatePerson } from '../../api';
import { Select, Input, ControlBar, DatePicker } from '../../shared';
import { conclusionUrl, defaultPersonData, dischargeUrl, form100Url, referralUrl } from '../../constants';
import { REQUIRED_FIELD_MESSAGE, personPageSchema } from '../../schemas';
import { formatDate } from '../../helpers';

import { Header } from '../Header';

import {
    cardStyles,
    inputPropsSx,
    radioStyles,
    genderWrapperStyles,
    fullWidthStyles,
    infoWrapperStyles,
    infoLeftSectionRowStyles,
    infoLeftSectionStyles,
    containerStyles,
    historyTitleWrapper,
    getMenuIconStyles,
    timelineContentWrapperStyles,
    recordDiagnosisStyles,
    formIconStyles
} from './styles';

const options = Object.values(Forms);

const getFormURL = (option: Forms) => {
    if (option === Forms.FORM_100) {
        return form100Url;
    }
    if (option === Forms.DISCHARGE) {
        return dischargeUrl;
    }
    if (option === Forms.REFERRAL) {
        return referralUrl;
    }
    if (option === Forms.CONCLUSION) {
        return conclusionUrl;
    }
};

export const PersonPage = () => {
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

    const records = watch('records.brief');
    const id = watch('id');
    const gender = watch('gender');
    
    const { errors } = formState;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const toggleMenuOpen = useCallback((event: MouseEvent<HTMLElement>) => {
        setAnchorEl(prevAnchor => {
            if (!prevAnchor) {
                return event.currentTarget;
            }
            return null;
        });
    }, [])

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
    };

    const handleMenuOptionSelect = useCallback((form: Forms) => () => {
        const formUrl = getFormURL(form);
        if (!formUrl) {
            return;
        }
        navigate(`${formUrl}/${id}/create`);
    }, [navigate, id]);

    const goToForm = useCallback(({ type, id: formId }: IBriefRecord) => () => {
        const formUrl = getFormURL(type);
        if (!formUrl) {
            return;
        }
        navigate(`${formUrl}/${id}/${formId}`, { state: { readonly: true } });
    }, [id, navigate]);

    return (
        <>
            <Header />
            <Container maxWidth={false} sx={containerStyles}>
                <Card sx={cardStyles}>
                    <ControlBar title='Швидкий пошук військовослужбовця' onSubmit={handleSubmit(submitUserChanges)} />
                    <Typography variant='h5'>Особиста інформація війсковослужбовця</Typography>
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
                                        value={watch('fullName') ?? ''}
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
                                        value={watch('rank') ?? ''}
                                    />
                                </Box>
                            </Box>
                            <Box sx={infoLeftSectionRowStyles}>
                                <Box sx={fullWidthStyles}>
                                    <Input
                                        label='Посвідчення особи'
                                        variant='outlined'
                                        inputProps={{ sx: inputPropsSx }}
                                        error={errors.personalId?.message}
                                        fullWidth={true}
                                        {...register('personalId')}
                                        onChange={handleInputChange('personalId')}
                                        value={watch('personalId') ?? ''}
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
                                        value={watch('tokenNumber') ?? ''}
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
                                        value={watch('phoneNumber') ?? ''}
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
                                    value={watch('militaryBase') ?? ''}
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
                    <Box sx={historyTitleWrapper}>
                        <Typography variant='h5'>Історія хвороби</Typography>
                        <Button
                            variant='contained'
                            color='inherit'
                            onClick={toggleMenuOpen}
                        >
                            ДОДАТИ ДОКУМЕНТИ
                            <OpenMenuIcon sx={getMenuIconStyles(isMenuOpen)} />
                        </Button>
                    </Box>
                    {!records.length && <Typography color='textSecondary'>Немає записів</Typography>}
                    <Timeline position='alternate'>
                        {records.map((record, idx) => {
                            const { id, date, fullDiagnosis, type } = record;
                            const shouldHaveConnector = idx < records.length - 1;
                            return (
                                <Fragment key={id}>
                                    <TimelineItem>
                                        <TimelineOppositeContent>
                                            <Typography>
                                                {formatDate(date)}
                                            </Typography>
                                        </TimelineOppositeContent>
                                        <TimelineSeparator>
                                            <TimelineDot />
                                            {shouldHaveConnector && <TimelineConnector />}
                                        </TimelineSeparator>
                                        <TimelineContent>
                                            <Box  sx={timelineContentWrapperStyles}>
                                                <Button
                                                    sx={{ width: 'fit-content', alignSelf: idx % 2 ? 'end' : 'start' }}
                                                    variant='contained'
                                                    color={type === Forms.FORM_100 ? 'primary' : 'secondary'}
                                                    onClick={goToForm(record)}
                                                >
                                                    {type}
                                                    <ArrowForwardIosIcon sx={formIconStyles} />
                                                </Button>
                                                <Box sx={recordDiagnosisStyles}>
                                                    <Typography color='textSecondary'>{fullDiagnosis}</Typography>
                                                </Box>
                                            </Box>
                                        </TimelineContent>
                                    </TimelineItem>
                                </Fragment>
                            )
                        })}
                    </Timeline>
                </Card>
            </Container>
            <Menu open={isMenuOpen} anchorEl={anchorEl} onClose={handleCloseMenu}>
                {options.map(op => (
                    <MenuItem key={op} value={op} onClick={handleMenuOptionSelect(op)}>{op}</MenuItem>
                ))}
            </Menu>
       </>
    );
}
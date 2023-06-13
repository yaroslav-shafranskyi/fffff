import { ChangeEvent, FC, useCallback, useEffect, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { Input, Select } from '../../../../shared';
import { ArmyRank, Gender, RecordType } from '../../../../api';
import { splitFullName } from '../../../../helpers';

import { dateNumberInputStyles, cursorPointerStyles } from '../../styles';

import { IPersonInfoProps, IPersonState, PersonDataType, UpdatePersonStateType } from './types';
import { getDefaultPersonState } from './constants';
import {
    columnStyles,
    fieldNameStyles,
    fullNameTitleStyles,
    fullWidthInputStyles,
    rowStyles,
    singleElementRowStyles,
    severalFieldsRowStyles,
    injuryReasonWrapper,
    reasonWrapperStyles,
    reasonAndNewRecordDateWrapperStyles,
    femaleWrapperStyles,
} from './styles';
import { convertPersonDataTypeToIPersonState } from './helpers';

export const PersonInfo: FC<IPersonInfoProps> = (props) => {
    const { data, onChange } = props;

    const stateFromProps = useMemo(() => data ? convertPersonDataTypeToIPersonState(data) : getDefaultPersonState(), [data]);

    const { register, setValue, watch } = useForm<IPersonState>({
        defaultValues: stateFromProps,
    });

    const values = watch();
    const {
        rank,
        gender,
        newRecordHour,
        newRecordMinute,
        newRecordDay,
        newRecordMonth,
        newRecordYear,
        newRecordReason,
    } = values;

    useEffect(() => {
        onChange?.('gender', gender);
    }, [gender, onChange]);

    useEffect(() => {
        if (newRecordReason) {
            onChange?.('lastRecord', newRecordReason, 'type')
        }
    }, [newRecordReason, onChange]);

    useEffect(() => {
        onChange?.('rank', rank);
    }, [rank, onChange]);

    useEffect(() => {
        const someFieldsMissing = !newRecordHour || !newRecordMinute || !newRecordDay || !newRecordMonth || !newRecordYear;
        if (someFieldsMissing || !onChange) {
            return;
        }
        const newRecordDate = new Date(`${newRecordMonth}.${newRecordDay}.${newRecordYear}, ${newRecordHour}:${newRecordMinute}`);
        // @ts-expect-error TODO: declare value correctly
        onChange('lastRecord', newRecordDate, 'date');
    }, [
        newRecordHour,
        newRecordMinute,
        newRecordDay,
        newRecordMonth,
        newRecordYear,
        onChange
    ])

    const handleCommonFieldChange = (field: keyof PersonDataType | keyof IPersonState, disableParentUpdate = false) =>
        (event: ChangeEvent<HTMLInputElement>) => {
            const newValue = event.target.value;
            setValue(field as keyof IPersonState, newValue);
            if (!disableParentUpdate) {
                onChange?.(field as keyof PersonDataType, newValue);
            }
        };

    const handleFullNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const newFullName = event.target.value;
        setValue('personFullName', newFullName);

        const { firstName, secondName, lastName, error } = splitFullName(newFullName);
        
        if (error) {
            return;
        }

        if (firstName !== data?.firstName) {
            onChange?.('firstName', firstName);
        }
        if (secondName !== data?.secondName) {
            onChange?.('secondName', secondName);
        }
        if (lastName !== data?.lastName) {
            onChange?.('lastName', lastName);
        }
    }, [data?.firstName, data?.secondName, data?.lastName, onChange, setValue]);

    const updatePersonState: UpdatePersonStateType = (key, value) => () => {
        setValue(key, value)
    };
    const getOptionColor = <T extends string>(name: keyof typeof values, option: T) => option === values[name] ? 'error' : 'textPrimary';

    return (
        <>
        <Box sx={rowStyles}>
                <Box sx={columnStyles}>
                    <Box sx={fieldNameStyles}>
                        <Typography>в/звання</Typography>
                    </Box>
                    <Select { ...register('rank')} options={Object.values(ArmyRank)} />
                </Box>
                <Box sx={columnStyles}>
                    <Box>
                        <Typography>в/ч, з’єднання</Typography>
                    </Box>
                    <Input {...register('militaryBase')} onChange={handleCommonFieldChange('militaryBase')} fullWidth={true} />
                </Box>
            </Box>
            <Box sx={singleElementRowStyles}>
                <Input
                    {...register('personFullName')}
                    onChange={handleFullNameChange}
                    sx={fullWidthInputStyles}
                />
                <Box sx={fullNameTitleStyles}>
                    <Typography>
                        прізвище
                    </Typography>
                    <Typography>
                        ім’я
                    </Typography>
                    <Typography>
                        по батькові
                    </Typography>
                </Box>
            </Box>
            <Box sx={severalFieldsRowStyles}>
                <Box sx={fieldNameStyles}>
                    <Typography>Посвідчення особи</Typography>
                </Box>
                <Input {...register('id')} onChange={handleCommonFieldChange('id')} sx={fullWidthInputStyles} />
            </Box>
            <Box sx={severalFieldsRowStyles}>
                <Box sx={fieldNameStyles}>
                    <Typography>Особистий №</Typography>
                </Box>
                <Input {...register('tokenNumber')} onChange={handleCommonFieldChange('tokenNumber')} sx={fullWidthInputStyles} />
                <Typography>Стать: </Typography>
                <Box sx={cursorPointerStyles} onClick={updatePersonState('gender', Gender.MALE)}>
                    <Typography color={getOptionColor('gender', Gender.MALE)}>{Gender.MALE}</Typography> 
                </Box>
                <Box sx={femaleWrapperStyles} onClick={updatePersonState('gender', Gender.FEMALE)}>
                    <Typography color={getOptionColor('gender', Gender.FEMALE)}>{Gender.FEMALE}</Typography> 
                </Box>
            </Box>
            
            <Box sx={reasonAndNewRecordDateWrapperStyles}>
                <Box sx={reasonWrapperStyles}>
                    <Box sx={injuryReasonWrapper} onClick={updatePersonState('newRecordReason', RecordType.INJURY)}>
                        <Typography color={getOptionColor('newRecordReason', RecordType.INJURY)}>Поранений</Typography>
                        <Typography>,</Typography>
                    </Box>
                    <Box sx={cursorPointerStyles} onClick={updatePersonState('newRecordReason', RecordType.SICK)}>
                        <Typography color={getOptionColor('newRecordReason', RecordType.SICK)}>захворів</Typography>
                    </Box>
                </Box>
                <Box>
                    <Typography>
                        <Input {...register('newRecordHour')} onChange={handleCommonFieldChange('newRecordHour', true)} sx={dateNumberInputStyles} /> год. 
                        <Input { ...register('newRecordHour')} onChange={handleCommonFieldChange('newRecordMinute', true)} sx={dateNumberInputStyles} /> {`хв. `}
                        <Input { ...register('newRecordDay')} onChange={handleCommonFieldChange('newRecordDay', true)} sx={dateNumberInputStyles} />. 
                        <Input { ...register('newRecordMonth')} onChange={handleCommonFieldChange('newRecordMonth', true)} sx={dateNumberInputStyles} />.
                        20<Input { ...register('newRecordYear')} onChange={handleCommonFieldChange('newRecordYear', true)} sx={dateNumberInputStyles} />р. 
                    </Typography>
                </Box>
            </Box>
        </>
    )
};

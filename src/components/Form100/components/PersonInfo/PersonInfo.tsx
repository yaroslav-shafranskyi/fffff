import { ChangeEvent, useCallback } from 'react';
import { Box, SelectChangeEvent, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import { DateInputWithSeparatedFields, Input, Select } from '../../../../shared';
import { ArmyRank, Gender, Rank, RecordType } from '../../../../api';
import { FieldErrorType } from '../../../../interfaces';

import { cursorPointerStyles } from '../../styles';
import { IForm100FrontState } from '../../types';

import { PersonDataType, UpdatePersonDataType } from './types';
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
    genderWrapperStyles,
} from './styles';

export const PersonInfo = () => {
    const { formState, register, setValue, watch, clearErrors } = useFormContext<IForm100FrontState>();

    const values = watch();
    const { person } = values;
    const { 
        fullName,
        militaryBase,
        rank,
        id,
        tokenNumber,
        lastRecord,
    } = person;

    const {person: errors, reason: reasonError } = formState.errors;

    const handleNewRecordDateChange = useCallback((newDate: Date) => {
        setValue('person.lastRecord.date', newDate);
        clearErrors('person.lastRecord.date');
    }, [clearErrors, setValue]);

    const handleCommonFieldChange = (field: keyof PersonDataType) =>
        (event: ChangeEvent<HTMLInputElement>) => {
            const newValue = event.target.value;
            setValue(`person.${field}`, newValue);
            clearErrors(`person.${field}`);
        };

    const updatePersonData: UpdatePersonDataType = (key, value, path) => () => {
        if (path) {
            // @ts-expect-error used for nested fields
            setValue(`person.${key}.${path}`, value);
            // @ts-expect-error used for nested fields
            clearErrors(`person.${key}.${path}`)
            return;
        }
        setValue(`person.${key}`, value);
        clearErrors(`person.${key}`)
    };

    const updateReason = (value: RecordType) => () => {
        setValue('person.lastRecord.type', value);
        setValue('reason', value);
        clearErrors('person.lastRecord.type');
        clearErrors('reason');
    }

    const handleRankChange = (event: SelectChangeEvent<unknown>) => {
        setValue('person.rank', event.target.value as Rank);
        clearErrors('person.rank');
    }

    const getOptionColor = <T extends string>(option: T, getCurrentValue: (person: PersonDataType) => T) => 
        option === getCurrentValue(person) ? 'error' : 'textPrimary';

    const getCurrentGender = (p: PersonDataType) => p.gender;
    const getCurrentReason = (p: PersonDataType) => p.lastRecord.type;

    console.log({ errors })

    return (
        <>
        <Box sx={rowStyles}>
                <Box sx={columnStyles}>
                    <Box sx={fieldNameStyles}>
                        <Typography>в/звання</Typography>
                    </Box>
                    <Box sx={{ width: '100% '}}>
                        <Select
                            { ...register('person.rank')}
                            onChange={handleRankChange}
                            value={rank}
                            options={Object.values(ArmyRank)}
                            sx={{ fontSize: '0.6rem' }}
                            error={errors?.rank?.message}
                        />
                    </Box>
                </Box>
                <Box sx={columnStyles}>
                    <Box>
                        <Typography>в/ч, з’єднання</Typography>
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <Input
                            value={militaryBase}
                            fullWidth={true}
                            error={errors?.militaryBase?.message}
                            onChange={handleCommonFieldChange('militaryBase')}
                        />
                    </Box>
                </Box>
            </Box>
            <Box sx={singleElementRowStyles}>
                <Input
                    value={fullName}
                    sx={fullWidthInputStyles}
                    error={errors?.fullName?.message}
                    onChange={handleCommonFieldChange('fullName')}
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
                <Box sx={{ width: '100%' }}>
                    <Input
                        value={id}
                        sx={fullWidthInputStyles}
                        error={errors?.id?.message}
                        onChange={handleCommonFieldChange('id')}
                    />
                </Box>
            </Box>
            <Box sx={severalFieldsRowStyles}>
                <Box sx={fieldNameStyles}>
                    <Typography>Особистий №</Typography>
                </Box>
                <Box sx={{ width: '100%' }}>
                    <Input
                        value={tokenNumber}
                        sx={fullWidthInputStyles}
                        error={errors?.tokenNumber?.message}
                        onChange={handleCommonFieldChange('tokenNumber')}
                    />
                </Box>
                <Box>
                    <Box sx={genderWrapperStyles}>
                        <Typography>Стать: </Typography>
                        <Box sx={cursorPointerStyles} onClick={updatePersonData('gender', Gender.MALE)}>
                            <Typography color={getOptionColor(Gender.MALE, getCurrentGender)}>{Gender.MALE}</Typography> 
                        </Box>
                        <Box sx={femaleWrapperStyles} onClick={updatePersonData('gender', Gender.FEMALE)}>
                            <Typography color={getOptionColor(Gender.FEMALE, getCurrentGender)}>{Gender.FEMALE}</Typography> 
                        </Box>
                    </Box>
                    <Typography color='error'>
                        {errors?.gender?.message}
                    </Typography>
                </Box>
            </Box>
            <Box sx={reasonAndNewRecordDateWrapperStyles}>
                <Box>
                    <Box sx={reasonWrapperStyles}>
                        <Box sx={injuryReasonWrapper} onClick={updateReason(RecordType.INJURY)}>
                            <Typography color={getOptionColor(RecordType.INJURY, getCurrentReason)}>Поранений</Typography>
                            <Typography>,</Typography>
                        </Box>
                        <Box sx={cursorPointerStyles} onClick={updateReason(RecordType.SICK)}>
                            <Typography color={getOptionColor(RecordType.SICK, getCurrentReason)}>захворів</Typography>
                        </Box>
                    </Box>
                    <Typography color='error'>
                        {reasonError?.message}
                    </Typography>
                </Box>
                <Box>
                    <DateInputWithSeparatedFields date={lastRecord?.date} onChange={handleNewRecordDateChange} />
                    {(errors as { lastRecord?: { date?: FieldErrorType}})?.lastRecord?.date?.message &&
                        <Typography color='error'>{errors?.lastRecord?.date?.message}</Typography>}
                </Box>
            </Box>
        </>
    )
};

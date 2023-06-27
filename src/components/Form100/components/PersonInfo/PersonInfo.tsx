import { ChangeEvent, useCallback, FC, useMemo } from 'react';
import { Box, SelectChangeEvent, Typography, SxProps } from '@mui/material';
import { Theme } from '@mui/system';
import { useFormContext } from 'react-hook-form';

import { DateInputWithSeparatedFields, Input, Select } from '../../../../shared';
import { ArmyRank, Gender, IPerson, Rank, RecordType } from '../../../../api';
import { FieldErrorType, IFCPropsWithReadonly } from '../../../../interfaces';

import { cursorPointerStyles } from '../../styles';
import { IForm100FrontState } from '../../types';

import { UpdatePersonDataType } from './types';
import {
    columnStyles,
    fieldNameStyles,
    fullNameTitleStyles,
    fullWidthInputStyles,
    rowStyles,
    singleElementRowStyles,
    severalFieldsRowStyles,
    reasonWrapperStyles,
    reasonAndNewRecordDateWrapperStyles,
    getFemaleWrapperStyles,
    genderWrapperStyles,
    getReasonWrapperStyles,
} from './styles';

export const PersonInfo: FC<IFCPropsWithReadonly> = ({ readonly }) => {
    const { formState, register, setValue, watch, clearErrors } = useFormContext<IForm100FrontState>();

    const values = watch();
    const { person } = values;
    const { 
        fullName,
        militaryBase,
        rank,
        personalId,
        tokenNumber,
        lastRecords,
    } = person;

    const {person: errors, reason: reasonError } = formState.errors;

    const handleNewRecordDateChange = useCallback((newDate: Date) => {
        if (readonly) {
            return;
        }
        setValue('person.lastRecords.form100.date', newDate);
        setValue('person.lastRecords.brief.date', newDate);
        clearErrors('person.lastRecords.form100.date');
        clearErrors('person.lastRecords.brief.date');
    }, [clearErrors, readonly, setValue]);

    const handleCommonFieldChange = useCallback((field: keyof IPerson) =>
        (event: ChangeEvent<HTMLInputElement>) => {
            if (readonly) {
                return;
            }
            const newValue = event.target.value;
            setValue(`person.${field}`, newValue);
            clearErrors(`person.${field}`);
        }, [readonly, setValue, clearErrors]);

    const handleTokenChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if (readonly) {
            return;
        }
        const newValue = event.target.value;
        setValue('person.tokenNumber', newValue);
        clearErrors('person.tokenNumber');
        const newValueWithoutSpaces = newValue.split(' ').join('');
        const birthDate = new Date(newValueWithoutSpaces);
        const isValidDate = !Number.isNaN(birthDate.getTime());
        if (isValidDate) {
            setValue('person.birthDate', birthDate);
        }
    }, [clearErrors, readonly, setValue])

    const updatePersonData: UpdatePersonDataType = useCallback((key, value, path) => () => {
        if (readonly) {
            return;
        }
        if (path) {
            // @ts-expect-error used for nested fields
            setValue(`person.${key}.${path}`, value);
            // @ts-expect-error used for nested fields
            clearErrors(`person.${key}.${path}`)
            return;
        }
        setValue(`person.${key}`, value);
        clearErrors(`person.${key}`)
    }, [clearErrors, readonly, setValue]);

    const updateReason = useCallback((value: RecordType) => () => {
        if (readonly) {
            return;
        }
        setValue('person.lastRecords.form100.reason', value);
        setValue('reason', value);
        clearErrors('person.lastRecords.form100.reason');
        clearErrors('reason');
    }, [clearErrors, readonly, setValue]);

    const handleRankChange = useCallback((event: SelectChangeEvent<unknown>) => {
        if (readonly) {
            return;
        }
        setValue('person.rank', event.target.value as Rank);
        clearErrors('person.rank');
    }, [clearErrors, readonly, setValue]);

    const getReasonColor = <T extends string>(option: T, getCurrentValue: (person: IPerson) => T | undefined) => 
        (option === getCurrentValue(person) && getCurrentValue(person) !== undefined) ? 'error' : 'textPrimary';
    
    const getGenderColor = <T extends string>(option: T, getCurrentValue: (person: IPerson) => T | undefined) => 
        (option === getCurrentValue(person) && getCurrentValue(person) !== undefined) ? 'success.light' : 'textPrimary';

    const getCurrentGender = (p: IPerson) => p.gender;
    const getCurrentReason = (p: IPerson) => p.lastRecords.form100?.reason;

    const optionWrapperSx: SxProps<Theme> = useMemo(() => readonly ? {} : cursorPointerStyles, [readonly]);

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
                        value={personalId}
                        sx={fullWidthInputStyles}
                        error={errors?.personalId?.message}
                        onChange={handleCommonFieldChange('personalId')}
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
                        onChange={handleTokenChange}
                    />
                </Box>
                <Box>
                    <Box sx={genderWrapperStyles}>
                        <Typography>Стать: </Typography>
                        <Box sx={optionWrapperSx} onClick={updatePersonData('gender', Gender.MALE)}>
                            <Typography color={getGenderColor(Gender.MALE, getCurrentGender)}>{Gender.MALE}</Typography> 
                        </Box>
                            <Box sx={getFemaleWrapperStyles(readonly)} onClick={updatePersonData('gender', Gender.FEMALE)}>
                            <Typography color={getGenderColor(Gender.FEMALE, getCurrentGender)}>{Gender.FEMALE}</Typography> 
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
                        <Box sx={getReasonWrapperStyles(readonly)} onClick={updateReason(RecordType.INJURY)}>
                            <Typography color={getReasonColor(RecordType.INJURY, getCurrentReason)}>Поранений</Typography>
                            <Typography>,</Typography>
                        </Box>
                        <Box sx={optionWrapperSx} onClick={updateReason(RecordType.SICK)}>
                            <Typography color={getReasonColor(RecordType.SICK, getCurrentReason)}>захворів</Typography>
                        </Box>
                    </Box>
                    <Typography color='error'>
                        {reasonError?.message}
                    </Typography>
                </Box>
                <Box>
                    <DateInputWithSeparatedFields date={lastRecords?.form100?.date} onChange={handleNewRecordDateChange} />
                    {(errors as { lastRecord?: { date?: FieldErrorType}})?.lastRecord?.date?.message &&
                        <Typography color='error'>{errors?.lastRecords?.form100?.date?.message}</Typography>}
                </Box>
            </Box>
        </>
    )
};

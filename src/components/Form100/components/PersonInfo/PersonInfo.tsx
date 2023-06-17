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
        id,
        tokenNumber,
        lastRecord,
    } = person;

    const {person: errors, reason: reasonError } = formState.errors;

    const handleNewRecordDateChange = useCallback((newDate: Date) => {
        if (readonly) {
            return;
        }
        setValue('person.lastRecord.date', newDate);
        clearErrors('person.lastRecord.date');
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
        setValue('person.lastRecord.reason', value);
        setValue('reason', value);
        clearErrors('person.lastRecord.reason');
        clearErrors('reason');
    }, [clearErrors, readonly, setValue]);

    const handleRankChange = useCallback((event: SelectChangeEvent<unknown>) => {
        if (readonly) {
            return;
        }
        setValue('person.rank', event.target.value as Rank);
        clearErrors('person.rank');
    }, [clearErrors, readonly, setValue]);

    const getReasonColor = <T extends string>(option: T, getCurrentValue: (person: IPerson) => T) => 
        option === getCurrentValue(person) ? 'error' : 'textPrimary';
    
    const getGenderColor = <T extends string>(option: T, getCurrentValue: (person: IPerson) => T) => 
        option === getCurrentValue(person) ? 'success.light' : 'textPrimary';

    const getCurrentGender = (p: IPerson) => p.gender;
    const getCurrentReason = (p: IPerson) => p.lastRecord.reason;

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
                    <DateInputWithSeparatedFields date={lastRecord?.date} onChange={handleNewRecordDateChange} />
                    {(errors as { lastRecord?: { date?: FieldErrorType}})?.lastRecord?.date?.message &&
                        <Typography color='error'>{errors?.lastRecord?.date?.message}</Typography>}
                </Box>
            </Box>
        </>
    )
};

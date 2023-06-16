import { ChangeEvent, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import { Input, Select } from '../../../../shared';
import { ArmyRank, Gender, IForm100, RecordType } from '../../../../api';
import { getDateData, updateDay, updateHour, updateMinute, updateMonth, updateYear } from '../../../../helpers';

import { dateNumberInputStyles, cursorPointerStyles } from '../../styles';

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
} from './styles';

export const PersonInfo = () => {
    const { register, setValue, watch } = useFormContext<IForm100>();

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

    const {
        hours: newRecordHour,
        minutes: newRecordMinute,
        day: newRecordDay,
        month: newRecordMonth,
        year: newRecordYear,
    } = useMemo(() => getDateData(lastRecord.date), [lastRecord.date]);

    const handleNewRecordDateChange = (updator: (date: Date, v: number) => void) => (event: ChangeEvent<HTMLInputElement>) => {
        const newDate = new Date(lastRecord.date ?? new Date());
        updator(newDate, +event.target.value);
        setValue('person.lastRecord.date', newDate);
    };

    const handleCommonFieldChange = (field: keyof PersonDataType) =>
        (event: ChangeEvent<HTMLInputElement>) => {
            const newValue = event.target.value;
            setValue(`person.${field}`, newValue);
        };

    const updatePersonData: UpdatePersonDataType = (key, value, path) => () => {
        if (path) {
            // @ts-expect-error TODO: declare value type correctly
            setValue(`person.${key}.${path}`, value);
            return;
        }
        setValue(`person.${key}`, value);
    };

    const getOptionColor = <T extends string>(option: T, getCurrentValue: (person: PersonDataType) => T) => 
        option === getCurrentValue(person) ? 'error' : 'textPrimary';

    const getCurrentGender = (p: PersonDataType) => p.gender;
    const getCurrentReason = (p: PersonDataType) => p.lastRecord.type;

    return (
        <>
        <Box sx={rowStyles}>
                <Box sx={columnStyles}>
                    <Box sx={fieldNameStyles}>
                        <Typography>в/звання</Typography>
                    </Box>
                    <Select { ...register('person.rank')} value={rank} options={Object.values(ArmyRank)} sx={{ fontSize: '0.6rem' }} />
                </Box>
                <Box sx={columnStyles}>
                    <Box>
                        <Typography>в/ч, з’єднання</Typography>
                    </Box>
                    <Input value={militaryBase} onChange={handleCommonFieldChange('militaryBase')} fullWidth={true} />
                </Box>
            </Box>
            <Box sx={singleElementRowStyles}>
                <Input
                    value={fullName}
                    sx={fullWidthInputStyles}
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
                <Input value={id} onChange={handleCommonFieldChange('id')} sx={fullWidthInputStyles} />
            </Box>
            <Box sx={severalFieldsRowStyles}>
                <Box sx={fieldNameStyles}>
                    <Typography>Особистий №</Typography>
                </Box>
                <Input value={tokenNumber} onChange={handleCommonFieldChange('tokenNumber')} sx={fullWidthInputStyles} />
                <Typography>Стать: </Typography>
                <Box sx={cursorPointerStyles} onClick={updatePersonData('gender', Gender.MALE)}>
                    <Typography color={getOptionColor(Gender.MALE, getCurrentGender)}>{Gender.MALE}</Typography> 
                </Box>
                <Box sx={femaleWrapperStyles} onClick={updatePersonData('gender', Gender.FEMALE)}>
                    <Typography color={getOptionColor(Gender.FEMALE, getCurrentGender)}>{Gender.FEMALE}</Typography> 
                </Box>
            </Box>
            
            <Box sx={reasonAndNewRecordDateWrapperStyles}>
                <Box sx={reasonWrapperStyles}>
                    <Box sx={injuryReasonWrapper} onClick={updatePersonData('lastRecord', RecordType.INJURY, 'type')}>
                        <Typography color={getOptionColor(RecordType.INJURY, getCurrentReason)}>Поранений</Typography>
                        <Typography>,</Typography>
                    </Box>
                    <Box sx={cursorPointerStyles} onClick={updatePersonData('lastRecord', RecordType.SICK, 'type')}>
                        <Typography color={getOptionColor(RecordType.SICK, getCurrentReason)}>захворів</Typography>
                    </Box>
                </Box>
                <Box>
                    <Typography>
                        <Input value={newRecordHour} onChange={handleNewRecordDateChange(updateHour)} sx={dateNumberInputStyles} /> год. 
                        <Input value={newRecordMinute} onChange={handleNewRecordDateChange(updateMinute)} sx={dateNumberInputStyles} /> {`хв. `}
                        <Input value={newRecordDay} onChange={handleNewRecordDateChange(updateDay)} sx={dateNumberInputStyles} />. 
                        <Input value={newRecordMonth} onChange={handleNewRecordDateChange(updateMonth)} sx={dateNumberInputStyles} />.
                        20<Input value={newRecordYear} onChange={handleNewRecordDateChange(updateYear(true))} sx={dateNumberInputStyles} />р. 
                    </Typography>
                </Box>
            </Box>
        </>
    )
};

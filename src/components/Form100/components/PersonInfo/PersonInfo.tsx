import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { Input, Select } from '../../../../shared';
import { ArmyRank, Gender, RecordType } from '../../../../api';

import { cursorPointerStyles } from '../../styles';

import { IPersonInfoProps, PersonDataType } from './types';
import { getDefaultPersonData } from './constants';
import {
    columnStyles,
    fieldNameStyles,
    fullNameTitleStyles,
    fullWidthInputStyles,
    rowStyles,
    singleElementRowStyles,
    severalFieldsRowStyles,
    injuryReasonWrapper,
    dateNumberInputStyles,
    reasonWrapperStyles,
    reasonAndNewRecordDateWrapperStyles,
} from './styles';

export const PersonInfo: FC<IPersonInfoProps> = (props) => {
    const { data } = props;

    const { register, getValues, setValue, watch } = useForm<PersonDataType>({
        defaultValues: data ?? getDefaultPersonData()
    })

    const values = getValues();

    watch('gender');
    watch('newRecordReason');

    const updateValue = <T extends string>(name: keyof typeof values, value: T) => () => {
        setValue(name, value)
    };
    const getOptionColor = <T extends string>(name: keyof typeof values, option: T) => option === values[name] ? 'primary' : 'textPrimary';

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
                    <Input {...register('militaryBase')} />
                </Box>
            </Box>
            <Box sx={singleElementRowStyles}>
                <Input {...register('personFullName')} sx={fullWidthInputStyles} />
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
                <Input {...register('id')} sx={fullWidthInputStyles} />
            </Box>
            <Box sx={severalFieldsRowStyles}>
                <Box sx={fieldNameStyles}>
                    <Typography>Особистий №</Typography>
                </Box>
                <Input {...register('tokenNumber')} sx={fullWidthInputStyles} />
                <Typography>Стать: </Typography>
                <Box sx={cursorPointerStyles} onClick={updateValue('gender', Gender.MALE)}>
                    <Typography color={getOptionColor('gender', Gender.MALE)}>{Gender.MALE}</Typography> 
                </Box>
                <Box sx={cursorPointerStyles} onClick={updateValue('gender', Gender.FEMALE)}>
                    <Typography color={getOptionColor('gender', Gender.FEMALE)}>{Gender.FEMALE}</Typography> 
                </Box>
            </Box>
            
            <Box sx={reasonAndNewRecordDateWrapperStyles}>
                <Box sx={reasonWrapperStyles}>
                    <Box sx={injuryReasonWrapper} onClick={updateValue('newRecordReason', RecordType.INJURY)}>
                        <Typography color={getOptionColor('newRecordReason', RecordType.INJURY)}>Поранений</Typography>
                        <Typography>,</Typography>
                    </Box>
                    <Box sx={cursorPointerStyles} onClick={updateValue('newRecordReason', RecordType.SICK)}>
                        <Typography color={getOptionColor('newRecordReason', RecordType.SICK)}>захворів</Typography>
                    </Box>
                </Box>
                <Box>
                    <Typography>
                        <Input {...register('newRecordHour')} sx={dateNumberInputStyles} /> год. 
                        <Input { ...register('newRecordHour')} sx={dateNumberInputStyles} /> {`хв. `}
                        <Input { ...register('newRecordDay')} sx={dateNumberInputStyles} />. 
                        <Input { ...register('newRecordMonth')} sx={dateNumberInputStyles} />.
                        20<Input { ...register('newRecordYear')} sx={dateNumberInputStyles} />р. 
                    </Typography>
                </Box>
            </Box>
        </>
    )
};

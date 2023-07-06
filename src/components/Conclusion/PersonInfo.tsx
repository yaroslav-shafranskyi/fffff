import { ChangeEvent, FC, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, Typography } from '@mui/material';

import { Input, CustomDatePicker, InputWithTextIndent } from '../../shared';
import { IConclusion } from '../../api';
import { IFCPropsWithReadonly } from '../../interfaces';
import { convertNullOrNumberToDate, formatDateWithoutDots } from '../../helpers';


import { birthDateInputStyles, birthDateWrapperStyles } from '../commonFormStyles';

export const PersonInfo: FC<IFCPropsWithReadonly> = ({ readonly }) => {
    const { formState, watch, register, setValue, clearErrors } = useFormContext<IConclusion>();
    const person = watch('person');
    const errors = formState.errors.person;

    const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
            if (!readonly) {
                setValue('person.fullName', event.target.value);
                clearErrors('person.fullName');
            }
    }, [readonly, setValue, clearErrors]);

    const handleDateCalendarChange = useCallback((date?: Date) => {
        if (readonly || !date) {
            return;
        }
        setValue('person.birthDate', date.getTime());
        clearErrors('person.birthDate')
    }, [readonly, setValue, clearErrors]);

    const birthDateError = errors?.birthDate?.message;

    return (
        <Box>
            <InputWithTextIndent
                title='2. Прізвище, ім’я, по батькові пацієнта'
                inputProps={{
                    ...register('person.fullName'),
                    onChange: handleInputChange,
                    value: person.fullName,
                    error: errors?.fullName?.message,
                    multiline: true,
                    rows: 2,
                    fullWidth: true
                }}
            />
            <Box sx={birthDateWrapperStyles}>
                <Typography>
                    3. Дата народження
                </Typography>
                <Box>
                <CustomDatePicker onChange={handleDateCalendarChange}>
                        <Input
                            sx={birthDateInputStyles}
                            inputProps={{ sx: { textAlign: 'center', p: 0 } }}
                            value={!person.birthDate ? '' : formatDateWithoutDots(convertNullOrNumberToDate(person.birthDate))}
                        />
                    </CustomDatePicker>
                    {birthDateError !== undefined && <Typography color='error'>{birthDateError}</Typography>}
                </Box>
            </Box>
        </Box>
    );
};

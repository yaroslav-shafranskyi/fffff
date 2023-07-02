import { ChangeEvent, FC, useCallback } from 'react';
import { FieldPath, useFormContext } from 'react-hook-form';
import { Box, Typography } from '@mui/material';

import { Input, CustomDatePicker, InputWithTextIndent } from '../../../../shared';
import { IDischarge, IPerson } from '../../../../api';
import { IFCPropsWithReadonly } from '../../../../interfaces';
import { birthDateInputStyles, birthDateWrapperStyles } from '../../../commonFormStyles';
import { formatDateWithoutDots } from '../../../../helpers';

import { addressNumberInputStyles, addressWrapperStyles, commonInputStyles } from './styles';

export const PersonInfo: FC<IFCPropsWithReadonly> = ({ readonly }) => {
    const { formState, watch, register, setValue, clearErrors } = useFormContext<IDischarge>();
    const person = watch('person');
    const errors = formState.errors.person;

    const handleInputChange = useCallback((field: FieldPath<IPerson>) =>
        (event: ChangeEvent<HTMLInputElement>) => {
            if (!readonly) {
                setValue(`person.${field}`, event.target.value);
                clearErrors(`person.${field}`);
            }
    }, [readonly, setValue, clearErrors]);

    const handleDateCalendarChange = useCallback((date?: Date) => {
        if (readonly) {
            return;
        }
        setValue('person.birthDate', date);
        clearErrors('person.birthDate')
    }, [readonly, setValue, clearErrors]);

    const birthDateError = errors?.birthDate?.message;

    return (
        <Box>
            <InputWithTextIndent
                title='1. Прізвище, ім’я, по батькові хворого'
                inputProps={{
                    ...register('person.fullName'),
                    onChange: handleInputChange('fullName'),
                    value: person.fullName,
                    error: errors?.fullName?.message,
                    multiline: true,
                    rows: 2,
                    sx: commonInputStyles
                }}
            />
            <Box sx={birthDateWrapperStyles}>
                <Typography>
                    2. Дата народження
                </Typography>
                <Box>
                <CustomDatePicker onChange={handleDateCalendarChange}>
                        <Input
                            sx={birthDateInputStyles}
                            inputProps={{ sx: { textAlign: 'center', p: 0 } }}
                            value={formatDateWithoutDots(person.birthDate)}
                        />
                    </CustomDatePicker>
                    {birthDateError !== undefined && <Typography color='error'>{birthDateError}</Typography>}
                </Box>
            </Box>
            <Box sx={addressWrapperStyles}>
                <Typography>
                    3. Місце проживання хворого: область
                </Typography>
                <Box>
                    <Input
                        {...register('person.address.oblast')}
                        value={person.address?.oblast}
                        onChange={handleInputChange('address.oblast')}
                        error={errors?.address?.oblast?.message}
                    />
                </Box>
                <Typography>
                    , район
                </Typography>
                <Box>
                    <Input
                        {...register('person.address.region')}
                        value={person.address?.region}
                        onChange={handleInputChange('address.region')}
                        error={errors?.address?.region?.message}
                    />
                </Box>
                <Typography>,</Typography>
            </Box>
            <Box sx={addressWrapperStyles}>
                <Typography>
                    місто(село)
                </Typography>
                <Box>
                    <Input
                        {...register('person.address.settlement')}
                        value={person.address?.settlement}
                        onChange={handleInputChange('address.settlement')}
                        error={errors?.address?.settlement?.message}
                    />
                </Box>
                <Typography>, вулиця</Typography>
                <Box>
                    <Input
                        {...register('person.address.street')}
                        value={person.address?.street}
                        onChange={handleInputChange('address.street')}
                        error={errors?.address?.street?.message}
                    />
                </Box>
                <Typography>, будинок</Typography>
                <Box>
                    <Input
                        {...register('person.address.building')}
                        value={person.address?.building}
                        onChange={handleInputChange('address.building')}
                        error={errors?.address?.building?.message}
                        sx={addressNumberInputStyles}
                    />
                </Box>
                <Typography>, кв.</Typography>
                <Box>
                    <Input
                        {...register('person.address.appartments')}
                        value={person.address?.appartments}
                        onChange={handleInputChange('address.appartments')}
                        error={errors?.address?.appartments?.message}
                        sx={addressNumberInputStyles}
                    />
                </Box>
            </Box>
            <InputWithTextIndent
                title='4. Місце роботи(посада)'
                inputProps={{
                    ...register('person.profession'),
                    value: person.profession ?? '',
                    onChange: handleInputChange('profession'),
                    multiline: true,
                    rows: 2,
                    sx: commonInputStyles,
                }}
            />
        </Box>
    );
};

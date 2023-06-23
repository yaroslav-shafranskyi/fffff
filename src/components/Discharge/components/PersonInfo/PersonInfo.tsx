import { ChangeEvent, FC, useCallback, useState } from 'react';
import { FieldPath, useFormContext } from 'react-hook-form';
import { Box, Dialog, Typography } from '@mui/material';

import { Input, DateCalendar } from '../../../../shared';
import { IDischarge, IPerson } from '../../../../api';
import { IFCPropsWithReadonly } from '../../../../interfaces';

import {
    addressNumberInputStyles,
    addressWrapperStyles,
    birthDateInputStyles,
    birthDateWrapperStyles,
} from './styles';
import { formatDateWithoutDots } from '../../../../helpers';
import { InputWithTextIndent } from '../InputWithTextIndent/InputWithTextIndent';

export const PersonInfo: FC<IFCPropsWithReadonly> = ({ readonly }) => {
    const { formState, watch, register, setValue } = useFormContext<IDischarge>();
    const person = watch('person');
    const errors = formState.errors.person;

    const [openCalendar, setOpenCalendar] = useState<boolean>(false);

    const handleInputChange = useCallback((field: FieldPath<IPerson>) =>
        (event: ChangeEvent<HTMLInputElement>) => {
            if (!readonly) {
                setValue(`person.${field}`, event.target.value)
            }
    }, [readonly, setValue]);

    const handleOpenCalendar = useCallback(() => {
        setOpenCalendar(true);
    }, []);

    const handleCloseCalendar = useCallback(() => {
        setOpenCalendar(false);
    }, []);

    const handleDateCalendarChange = useCallback((date?: Date) => {
        if (readonly) {
            return;
        }
        setValue('person.birthDate', date);
        setOpenCalendar(false);
    }, [readonly, setValue]);

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
                    rows: 2
                }}
            />
            <Box sx={birthDateWrapperStyles}>
                <Typography>
                    2. Дата народження
                </Typography>
                <Input
                    sx={birthDateInputStyles}
                    inputProps={{ sx: { textAlign: 'center' } }}
                    value={formatDateWithoutDots(person.birthDate)}
                    onClick={handleOpenCalendar}
                />
                {birthDateError !== undefined && <Typography color='error'>{birthDateError}</Typography>}
            </Box>
            <Box sx={addressWrapperStyles}>
                <Typography>
                    3. Місце проживання хворого: область
                </Typography>
                <Input
                    {...register('person.address.oblast')}
                    value={person.address?.oblast}
                    onChange={handleInputChange('address.oblast')}
                    error={errors?.address?.oblast?.message}
                />
                <Typography>
                    , район
                </Typography>
                <Input
                    {...register('person.address.region')}
                    value={person.address?.region}
                    onChange={handleInputChange('address.region')}
                    error={errors?.address?.region?.message}
                />
                <Typography>,</Typography>
            </Box>
            <Box sx={addressWrapperStyles}>
                <Typography>
                    місто(село)
                </Typography>
                <Input
                    {...register('person.address.settlement')}
                    value={person.address?.settlement}
                    onChange={handleInputChange('address.settlement')}
                    error={errors?.address?.settlement?.message}
                />
                <Typography>, вулиця</Typography>
                <Input
                    {...register('person.address.street')}
                    value={person.address?.street}
                    onChange={handleInputChange('address.street')}
                    error={errors?.address?.street?.message}
                />
                <Typography>, будинок</Typography>
                <Input
                    {...register('person.address.building')}
                    value={person.address?.building}
                    onChange={handleInputChange('address.building')}
                    error={errors?.address?.building?.message}
                    sx={addressNumberInputStyles}
                />
                <Typography>, кв.</Typography>
                <Input
                    {...register('person.address.appartments')}
                    value={person.address?.appartments}
                    onChange={handleInputChange('address.appartments')}
                    error={errors?.address?.appartments?.message}
                    sx={addressNumberInputStyles}
                />
            </Box>
            <InputWithTextIndent
                title='4. Місце роботи(посада)'
                inputProps={{
                    ...register('person.profession'),
                    value: person.profession,
                    onChange: handleInputChange('profession'),
                    multiline: true,
                    rows: 2,
                }}
            />
            <Dialog open={openCalendar} onClose={handleCloseCalendar}>
                <DateCalendar onChange={handleDateCalendarChange} />
            </Dialog>
        </Box>
    );
};

import { useLocation } from 'react-router-dom';
import { Card, Typography, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';

import { IPerson, useGetPerson } from '../../api';
import { Select, Input } from '../../shared';
import { defaultPersonData } from '../../constants';

import { containerStyles } from './styles';

export const Person = () => {
    const { pathname } = useLocation();

    const personId = decodeURI(pathname.split('/persons')[1]);

    const { data: person } = useGetPerson(personId);

    const { register, watch, setValue } = useForm<IPerson>({
        defaultValues: person ?? defaultPersonData,
    });

    return (
        <Card sx={containerStyles}>
            <Typography variant='h4'>Інформація про військовослужбовця</Typography>
            <Grid container={true} spacing={2}>
                <Grid xs={8}>
                    <Input variant='outlined' {...register('fullName')} />
                </Grid>
            </Grid>
        </Card>
    );
}
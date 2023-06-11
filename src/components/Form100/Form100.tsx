import { ChangeEvent, useMemo, FC, useState } from 'react';
import { Box, Typography, Input } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { IForm100 } from '../../api';

import { CounterfoilFront } from './components/Counterfoil';

import { initialForm100 } from './constants';
import { form100Schema } from './schemas';
import { containerStyles, formWrapperStyles, boldTextStyles } from './styles';

export interface IForm100Props {
    form100?: IForm100;
}

export const Form100: FC<IForm100Props> = (props) => {
    const { form100 } = props;

    const { register, formState } = useForm<IForm100>({
        resolver: yupResolver(form100Schema)
    });

    const [showFormCreatedAtDialog, setShowFormCreatedAtDialog] = useState<boolean>(false);

    const formCreatedAt = useMemo(() => (form100 ?? formState.dirtyFields)?.date, [form100, formState.dirtyFields])

    return <Box sx={containerStyles}>
        <Box sx={formWrapperStyles}>
            <CounterfoilFront />
            <Box></Box>
            <Box></Box>
        </Box>
    </Box>
}
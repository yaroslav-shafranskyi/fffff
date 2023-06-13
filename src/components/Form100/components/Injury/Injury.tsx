import { FC } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { IInjury } from '../../../../api';
import { injuriesFields } from '../../../../constants';

import { cursorPointerStyles, iconStyles } from '../../styles';

import { IInjuryProps } from "./types";
import {
    injuryTypeTitleCellStyles,
    injuryCellStyles,
    injuryTypeCellStyles,
} from './styles';

export const Injury: FC<IInjuryProps> = (props) => {
    const { data, onChange } = props;
    
    const { watch, setValue } = useForm<IInjury>({
        defaultValues: data ?? {}
    });

    const injury = watch();

    const updateInjury = (injuryType: keyof IInjury) => () => {
        setValue(injuryType, !injury[injuryType]);
        onChange?.(injuryType, !injury?.[injuryType]);
    }
    const getInjuryColor = (injuryType: keyof IInjury) => injury?.[injuryType] ? 'error.main' : 'background.paper';

    return (
        <Box>
            <Box sx={injuryTypeTitleCellStyles}>
                <Typography sx={{ fontWeight: 'bold', pl: 2 }}>Б</Typography>
                <Typography sx={{ fontWeight: 'bold' }}>НБ</Typography>
            </Box>
            <Box sx={injuryCellStyles}>
                {Object.keys(injuriesFields).slice().sort().map(key => <Box sx={injuryTypeCellStyles}>
                        <Box>
                            <Typography key={key}>
                                {injuriesFields[+key].name}
                            </Typography>
                        </Box>
                        <Box
                            sx={cursorPointerStyles}
                            onClick={updateInjury(`${injuriesFields[+key].fieldName}`)}
                            bgcolor={getInjuryColor(injuriesFields[+key].fieldName)}
                        >
                        <IconButton sx={iconStyles} size='small'>
                            {injuriesFields[+key].icon}
                        </IconButton>
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    )
};
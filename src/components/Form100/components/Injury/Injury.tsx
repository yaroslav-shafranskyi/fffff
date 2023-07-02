import { FC } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import {  useFormContext } from 'react-hook-form';

import { IForm100, IInjury } from '../../../../api';
import { injuriesFields } from '../../../../constants';
import { IFCPropsWithReadonly } from '../../../../interfaces';

import { cursorPointerStyles, iconStyles } from '../../styles';

import {
    injuryTypeTitleCellStyles,
    injuryCellStyles,
    injuryTypeCellStyles,
} from './styles';

export const Injury: FC<IFCPropsWithReadonly> = ({ readonly }) => {   
    const { watch, setValue } = useFormContext<IForm100>();

    const injury = watch('injury');

    const updateInjury = (injuryType: keyof IInjury) => () => {
        if (!readonly) {
            setValue(`injury.${injuryType}`, !injury?.[injuryType]);
        }
    }
    const getInjuryColor = (injuryType: keyof IInjury) => injury?.[injuryType] ? 'error.main' : 'background.paper';

    const clickableBoxStyles = readonly ? {} : cursorPointerStyles;

    return (
        <Box>
            <Box sx={injuryTypeTitleCellStyles}>
                <Typography sx={{ fontWeight: 'bold', pl: 2 }}>Б</Typography>
                <Typography sx={{ fontWeight: 'bold' }}>НБ</Typography>
            </Box>
            <Box sx={injuryCellStyles}>
                {Object.keys(injuriesFields).slice().sort().map(key => <Box sx={injuryTypeCellStyles} key={key}>
                        <Box sx={{ pl: .5 }}>
                            <Typography>
                                {injuriesFields[+key].name}
                            </Typography>
                        </Box>
                        <Box
                            sx={clickableBoxStyles}
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
import { Box, IconButton, Typography } from '@mui/material';
import {  useFormContext } from 'react-hook-form';

import { IForm100, IInjury } from '../../../../api';
import { injuriesFields } from '../../../../constants';

import { cursorPointerStyles, iconStyles } from '../../styles';

import {
    injuryTypeTitleCellStyles,
    injuryCellStyles,
    injuryTypeCellStyles,
} from './styles';

export const Injury = () => {   
    const { watch, setValue } = useFormContext<IForm100>();

    const injury = watch('injury');

    const updateInjury = (injuryType: keyof IInjury) => () => {
        setValue(`injury.${injuryType}`, !injury?.[injuryType]);
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
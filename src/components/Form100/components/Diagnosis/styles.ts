import { Theme } from '@mui/system';
import { SxProps } from '@mui/material';

export const diagnosisStyles: SxProps<Theme> = (theme) => ({
    pl: .5,
    display: 'flex',
    height: theme.spacing(8)
});

export const diagnosisInputStyles: SxProps<Theme> = (theme) => ({
    p: 0, 
    '& :first-child': {
        p: 0,
        maxHeight: theme.spacing(8)
    }
});

export const inputPropsStyles: SxProps = {
    p: 0,
    textIndent: 60,
};

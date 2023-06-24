import { SxProps } from "@mui/material";
import { Theme } from '@mui/system';

export const birthDateWrapperStyles: SxProps = {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
};

export const birthDateInputStyles: SxProps<Theme> = (theme) => ({
    maxWidth: theme.spacing(9),
    textAlign: 'center',
});

export const addressWrapperStyles: SxProps = {
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    gap: '2px',
};

export const addressNumberInputStyles: SxProps<Theme> = (theme) => ({
    maxWidth: theme.spacing(6),
});

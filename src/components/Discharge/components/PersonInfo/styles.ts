import { SxProps } from "@mui/material";
import { Theme } from '@mui/system';

export const addressWrapperStyles: SxProps = {
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    gap: '2px',
};

export const addressNumberInputStyles: SxProps<Theme> = (theme) => ({
    maxWidth: theme.spacing(6),
});

export const commonInputStyles: SxProps<Theme> = (theme) => ({
    width: `calc(100% - ${theme.spacing(2)})`,
    mx: 1,
    p: 0,
});

import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

export const dialogActionsStyles: SxProps = {
    display: 'flex',
    justifyContent: 'space-around',
    px: 5,
    mb: 5,
    gap: 2,
};

export const dialogContentStyles: SxProps = {
    gap: 6,
    display: 'grid',
    p: 5,
};

export const dialogButtonStyles: SxProps<Theme> = (theme) => ({
    width: '100%',
    height: theme.spacing(7),
});

export const openButtonStyles: SxProps<Theme> = (theme) => ({
    ...dialogButtonStyles(theme),
    bgcolor: 'primary.light',
    color: 'text.primary',
    '&:hover': {
        bgcolor: theme.palette.primary.main,
    },
})

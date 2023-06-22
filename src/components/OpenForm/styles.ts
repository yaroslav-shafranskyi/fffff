import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

export const dialogActionsStyles: SxProps = {
    display: 'flex',
    justifyContent: 'space-around',
    px: 10,
    mb: 5,
    gap: 2,
};

export const dialogContentStyles: SxProps = {
    gap: 6,
    display: 'grid',
    px: 10,
    py: 5,
};

export const dialogButtonStyles: SxProps<Theme> = (theme) => ({
    width: '100%',
    height: theme.spacing(7),
});

export const openButtonStyles: SxProps<Theme> = (theme) => ({
    ...dialogButtonStyles(theme),
    bgcolor: 'secondary.main',
    '&:hover': {
        bgcolor: 'secondary.dark',
    },
})

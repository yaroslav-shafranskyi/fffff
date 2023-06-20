import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

export const containerStyles: SxProps = {
    minHeight: '100vh',
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
    bgcolor: 'background.paper',
};

export const backButtonStyles: SxProps<Theme> = (theme) => ({
    position: 'absolute',
    left: theme.spacing(2),
});

import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

export const containerStyles: SxProps = {
    minHeight: '100vh',
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
};

export const tableStyles: SxProps = {
    minHeight: 300,
};

export const backButtonStyles: SxProps<Theme> = (theme) => ({
    position: 'absolute',
    left: theme.spacing(2),
});

export const placeholderStyles = {
    position: 'absolute',
    borderBottom: 'none',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
}

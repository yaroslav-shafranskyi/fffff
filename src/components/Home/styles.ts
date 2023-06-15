import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

export const containerStyles: SxProps = {
    height: '100%',
    borderRadius: 0,
    p: 2,
    display: 'grid',
    pb: 8,
};

export const headerStyles: SxProps<Theme> = (theme) => ({
    height: theme.spacing(6),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
});

export const iconWrapperStyles: SxProps = {
    display: 'flex',
    gap: 2,
};

export const titleWrapperStyles: SxProps = {
    textAlign: 'center',
    p: 8, 
    display: 'grid',
    gap: 2,
    height: 'fitContent'
};

export const mainWrapperStyles: SxProps = {
    display: 'grid',
    gridTemplateRows: '2fr 1fr',
    gap: 1,
};

export const mainButtonStyles: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    textTransform: 'capitalize',
    alignItems: 'baseline',
    width: '100%',
};

export const buttonDescStyles: SxProps = {
    textTransform: 'none',
    textAlign: 'left',
};

export const lightButtonStyles: SxProps = {
    ...mainButtonStyles,
    bgcolor: 'primary.light',
};

export const mainUpperButtonsStyles: SxProps = {
    gap: 1,
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
};

export const searchButtonStyles: SxProps = {
    display: 'grid',
    gap: 1,
};

export const mainLowerButtonsStyles: SxProps = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 1,
};

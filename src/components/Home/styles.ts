import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

export const containerStyles: SxProps = {
    height: '100%',
    borderRadius: 0,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    pb: '43px',
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
    px: 8, 
    display: 'grid',
    gap: 2,
    height: 'fit-content',
    py: 4,
};

export const mainWrapperStyles: SxProps = {
    display: 'grid',
    gridTemplateRows: '2fr 1fr',
    gap: 1,
    mt: 7.5,
};

export const mainButtonStyles: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    textTransform: 'capitalize',
    alignItems: 'baseline',
    width: '100%',
    height: '100%',
    p: 4,
};

export const form100ButtonStyles: SxProps = {
    ...mainButtonStyles,
    justifyContent: 'start',
    p: 3,
};

export const buttonDescStyles: SxProps = {
    textTransform: 'none',
    textAlign: 'left',
};

export const lightButtonStyles: SxProps = {
    ...mainButtonStyles,
    bgcolor: 'secondary.main',
    '&:hover': {
        bgcolor: 'secondary.dark',
    },
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

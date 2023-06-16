import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

export const containerStyles: SxProps = {
    p: 2,
    height: '100vh',
};

export const boldTextStyles: SxProps = {
    fontWeight: 'bold'
};

export const SECTION_MIN_WIDTH = 350;

export const sectionStyles: SxProps = {
    minWidth: SECTION_MIN_WIDTH,
};

export const iconStyles: SxProps<Theme> = (theme) => ({ 
    width: theme.spacing(3),
    height: theme.spacing(3),
    p: 0,
    margin: 'auto',
    '& svg:first-of-type': {
        ':focus': {
            outline: 'none',
            border: 'none'
        }
    }
});

export const cursorPointerStyles: SxProps = {
    cursor: 'pointer'
};

export const displayFlexStyles: SxProps = {
    display: 'flex', 
};

export const dateNumberInputStyles: SxProps = {
    width: 18,
    p: 0,
    h: 3,
};

export const severalInlineOptionsWrapperStyles: SxProps = {
    display: 'flex',
    gridColumnGap: 2,
};

export const commonWrapperStyles: SxProps = {
    border: '4px solid',
    borderColor: 'text.primary',
    display: 'grid', 
};

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

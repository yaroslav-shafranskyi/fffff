import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

export const containerStyles: SxProps = {
    border: 'none',
    width: '100vw',
    bgcolor: 'background.paper',
    color: 'text.primary',
};

export const formWrapperStyles: SxProps = {
    border: '4px solid',
    borderColor: 'text.primary',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)'
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
    '& :first-child': {
        ':focus': {
            outline: 'none',
            border: 'none'
        }
    }
});

import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

export const tableStyles: SxProps = {
    minHeight: 300,
};

export const placeholderStyles = {
    position: 'absolute',
    borderBottom: 'none',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
};

export const headerStyles: SxProps = {
    '& th:first-of-type': {
        pl: 2,
    },
    '& th:last-of-type': {
        pr: 2,
    },
};

export const headerCellStyles = {
    p: 0,
    position: 'relative',
};

export const headerCellContentStyles = {
    display: 'flex',
    alignItems: 'center',
    width: 'min-content',
};

export const filterInputStyles: SxProps<Theme> = (theme) => ({
    position: 'absolute',
    bottom: 0,
    left: theme.spacing(2),
    bgcolor: theme.palette.background.paper,
    width: theme.spacing(17),
});

export const filterInfoStyles: SxProps = {
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'baseline',
    gap: .5,
};

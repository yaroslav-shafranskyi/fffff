import { SxProps } from '@mui/material';

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
};

export const headerCellContentStyles = {
    display: 'flex',
    alignItems: 'center',
    width: 'min-content',
};

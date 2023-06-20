import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

export const tableStyles: SxProps = {
    minHeight: 300,
    tableLayout: 'fixed',
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

export const headerStyles: SxProps<Theme> = (theme) => ({
    height: theme.spacing(6),
    '& th:first-of-type': {
        pl: 2,
    },
    '& th:last-of-type': {
        pr: 2,
    },
});

export const headerCellStyles = {
    px: .25,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '& p:first-of-type': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
};

export const toolbarWrapperStyles: SxProps = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
};

export const titleWrapperStyles: SxProps = {
    display: 'flex',
    justifyContent: 'start',
    gap: 2,
};

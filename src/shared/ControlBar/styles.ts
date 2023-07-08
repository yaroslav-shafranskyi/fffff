import { SxProps } from '@mui/material';

export const containerStyles: SxProps = {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    pb: 1,
    whiteSpace: 'nowrap',
};

export const titleStyles: SxProps = {
    display: 'flex',
    alignItems: 'center',
};

export const actionsWrapperStyles: SxProps = {
    gap: 2,
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
};

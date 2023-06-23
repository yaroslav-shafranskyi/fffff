import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

export const rowStyles: SxProps = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 1,
    whiteSpace: 'nowrap',
};

export const blankBoxStyles: SxProps = {
    width: '100%',
    borderBottom: '1px solid',
    mb: '1px',
};

export const inputStyles: SxProps<Theme> = (theme) => ({
    width: theme.spacing(8),
});

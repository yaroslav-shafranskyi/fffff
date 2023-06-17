import { SxProps } from '@mui/material';

export const getPlaitStatusWrapperStyles = (readonly?: boolean): SxProps => ({
    marginLeft: '2px',
    cursor: readonly ? 'inherit' : 'pointer',
});

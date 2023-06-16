import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

export const containerStyles: SxProps<Theme> = (theme) => ({
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    minHeight: `calc(100vh - ${theme.spacing(13)})`
});

export const tipWrapperStyles: SxProps = {
    fontStyle: 'italic',
    display: 'flex',
    justifyContent: 'end',
    pr: 3,
};

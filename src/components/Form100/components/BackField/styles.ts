import { Theme } from "@mui/system";
import { SxProps } from '@mui/material';

export const titleStyles: SxProps<Theme> = (theme) => ({
    position: 'absolute',
    left: theme.spacing(),
    pr: 1.5,
});

export const inputStyles: SxProps = {
    width: '100%',
    '& .MuiInputBase-root': {
        padding: '1px',
    },
};

export const wrapperStyles: SxProps = {
    position: 'relative',
    display: 'flex',
};

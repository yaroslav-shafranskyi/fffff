import { SxProps } from "@mui/material";
import { Theme } from "@mui/system";

export const textFieldStyles: SxProps<Theme> = (theme) => ({
    width: theme.spacing(2.5),
});

export const wrapperStyles: SxProps = {
    display: 'flex',
    gap: '2px',
};

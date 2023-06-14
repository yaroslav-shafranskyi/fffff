import { SxProps } from "@mui/material";
import { Theme } from '@mui/system';

export const containerStyles: SxProps = {
    borderRight: '1.5px solid',
    borderBottom: '1.5px solid',
    pl: .5,
};

export const textFieldStyles: SxProps<Theme> = (theme) => ({
    width: `calc(100% + ${theme.spacing(0.5)})`,
    ml: -.5,
    p: 0,
});

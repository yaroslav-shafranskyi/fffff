import { SxProps } from "@mui/material";
import { Theme } from "@mui/system";

import { INPUT_WITH_HINT_LINE_HEIGHT } from "../../constants";

import { flexContainerStyles } from "../commonFormStyles";

export const inputHintStyles: SxProps = {
    position: 'absolute',
    top: INPUT_WITH_HINT_LINE_HEIGHT - 3,
    margin: 'auto',
    left: 0,
    right: 0,
    width: 'fit-content',
    zIndex: 'fab',
};

export const inputTitleStyles: SxProps<Theme> = (theme) => ({
    position: 'absolute',
    zIndex: 'fab',
    p: .5,
    pl: 0,
    background: theme.palette.background.paper,
});

export const contentDataWrapperStyles: SxProps = {
    p: 1,
    ...flexContainerStyles,
};

export const backPageWrapper: SxProps = {
    display: 'grid',
    p: 1,
    gap: 1,
};

export const backPageFooterStyles: SxProps = {
    m: 2,
    mb: 1,
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
};

export const doctorHintStyles: SxProps<Theme> = (theme) => ({
    position: 'absolute',
    bottom: theme.spacing(-2),
});

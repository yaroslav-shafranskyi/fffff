import { SxProps } from "@mui/material";
import { Theme } from "@mui/system";

import { INPUT_WITH_HINT_LINE_HEIGHT, OUTER_BORDER_WIDTH } from "../constants";

export const boldTextStyles: SxProps = {
    fontWeight: 'bold',
};

export const flexContainerStyles: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
};

export const containerStyles: SxProps = {
    ...flexContainerStyles,
    p: 2,
    bgcolor: 'background.paper',
    minHeight: '100vh',
    '& textarea': {
        overflow: 'hidden',
    },
};

export const formWrapperStyles: SxProps = {
    ...flexContainerStyles,
};

export const formContentStyles: SxProps = {
    border: `${OUTER_BORDER_WIDTH}px solid`,
};

export const contentTitleWrapperStyles: SxProps = {
    borderBlock: `${OUTER_BORDER_WIDTH}px solid`,
    p: 2,
    textAlign: 'center',
};

export const birthDateWrapperStyles: SxProps = {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
};

export const birthDateInputStyles: SxProps<Theme> = (theme) => ({
    maxWidth: theme.spacing(9),
    textAlign: 'center',
});

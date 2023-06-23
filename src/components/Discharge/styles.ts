import { SxProps } from "@mui/material";
import { Theme } from "@mui/system";

export const OUTER_BORDER_WIDTH = 3;
export const INNER_BORDER_WIDTH = 1;
export const DEFAULT_LINE_HEIGHT = 24;
export const INPUT_WITH_HINT_LINE_HEIGHT = 30;

export const getMultilineInputDefaultBackground = (theme: Theme) => `repeating-linear-gradient(${theme.palette.background.paper} 0, ${theme.palette.background.paper} ${DEFAULT_LINE_HEIGHT - 1}px, ${theme.palette.text.primary} ${DEFAULT_LINE_HEIGHT}px)`;

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

export const headerStyles: SxProps = {
    display: 'grid',
    alignSelf: 'end',
};

export const formContentStyles: SxProps = {
    border: `${OUTER_BORDER_WIDTH}px solid`,
};

export const commonInputStyles: SxProps<Theme> = (theme) => ({
    width: `calc(100% - ${theme.spacing(2)})`,
    mx: 1,
    p: 0,
});

export const multilineInputStyles: SxProps<Theme> = (theme) => ({
    background: `repeating-linear-gradient(${theme.palette.background.paper} 0, ${theme.palette.background.paper} ${DEFAULT_LINE_HEIGHT - 1}px, ${theme.palette.text.primary} ${DEFAULT_LINE_HEIGHT}px)`,
    lineHeight: `${DEFAULT_LINE_HEIGHT}px`,
    mb: '-5px',
});

export const contentTitleWrapperStyles: SxProps = {
    borderBlock: `${OUTER_BORDER_WIDTH}px solid`,
    p: 2,
    textAlign: 'center',
};

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

export const getMultilineInputPropsSx = (textIndent: number | string = '100%'): SxProps<Theme> =>
    (theme) => ({
        background: getMultilineInputDefaultBackground(theme),
        textIndent,
    });

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

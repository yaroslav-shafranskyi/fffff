import { Theme } from "@mui/system";
import { SxProps } from "@mui/material";

export const OUTER_BORDER_WIDTH = 3;
export const INNER_BORDER_WIDTH = 1;
export const DEFAULT_LINE_HEIGHT = 24;
export const INPUT_WITH_HINT_LINE_HEIGHT = 30;

export const getMultilineInputDefaultBackground = (theme: Theme) =>
  `repeating-linear-gradient(${theme.palette.background.paper} 0, ${
    theme.palette.background.paper
  } ${DEFAULT_LINE_HEIGHT - 1}px, ${
    theme.palette.text.primary
  } ${DEFAULT_LINE_HEIGHT}px)`;

export const commonInputStyles: SxProps<Theme> = (theme) => ({
  width: `calc(100% - ${theme.spacing(2)})`,
  mx: 1,
  p: 0,
});

export const multilineInputStyles: SxProps<Theme> = (theme) => ({
  background: `repeating-linear-gradient(${theme.palette.background.paper} 0, ${
    theme.palette.background.paper
  } ${DEFAULT_LINE_HEIGHT - 1}px, ${
    theme.palette.text.primary
  } ${DEFAULT_LINE_HEIGHT}px)`,
  lineHeight: `${DEFAULT_LINE_HEIGHT}px`,
  mb: "-5px",
});

export const clearButtonStyles: SxProps<Theme> = (theme) => ({
  bgcolor: "primary.light",
  "&:hover": {
    bgcolor: theme.palette.primary.main,
  },
});

export const inputLabelStyles: SxProps = {
  bgcolor: "background.paper",
  px: 0.5,
};

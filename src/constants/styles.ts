import { Theme } from "@mui/system";

export const OUTER_BORDER_WIDTH = 3;
export const INNER_BORDER_WIDTH = 1;
export const DEFAULT_LINE_HEIGHT = 24;
export const INPUT_WITH_HINT_LINE_HEIGHT = 30;

export const getMultilineInputDefaultBackground = (theme: Theme) => `repeating-linear-gradient(${theme.palette.background.paper} 0, ${theme.palette.background.paper} ${DEFAULT_LINE_HEIGHT - 1}px, ${theme.palette.text.primary} ${DEFAULT_LINE_HEIGHT}px)`;

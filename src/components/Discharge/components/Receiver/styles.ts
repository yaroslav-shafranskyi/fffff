import { SxProps } from "@mui/material";
import { Theme } from '@mui/system';

import { INPUT_WITH_HINT_LINE_HEIGHT, commonInputStyles } from '../../../../constants';

export const receiverInputStyles = commonInputStyles;

export const receiverInputPropsSx: SxProps<Theme> = (theme) => ({
    background: `repeating-linear-gradient(${theme.palette.background.paper} 0, ${theme.palette.background.paper} ${INPUT_WITH_HINT_LINE_HEIGHT - 3}px, ${theme.palette.text.primary} ${INPUT_WITH_HINT_LINE_HEIGHT - 2}px)`,
    textIndent: theme.spacing(2),
    lineHeight: `${INPUT_WITH_HINT_LINE_HEIGHT}px`,
    mb: '-13px',
});

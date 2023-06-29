import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

import { getMultilineInputDefaultBackground } from '../../constants';

export const getMultilineInputPropsSx = (textIndent: number | string = '100%'): SxProps<Theme> =>
    (theme) => ({
        background: getMultilineInputDefaultBackground(theme),
        textIndent,
        mb: -.5
    });

export const inputTitleStyles: SxProps<Theme> = (theme) => ({
    position: 'absolute',
    zIndex: 'fab',
    p: .5,
    pl: 0,
    background: theme.palette.background.paper,
});

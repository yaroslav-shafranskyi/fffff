import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

import { getMultilineInputDefaultBackground } from '../../constants';

export const commonInputStyles: SxProps<Theme> = (theme) => ({
    width: `calc(100% - ${theme.spacing(2)})`,
    mx: 1,
    p: 0,
});

export const getMultilineInputPropsSx = (textIndent: number | string = '100%'): SxProps<Theme> =>
    (theme) => ({
        background: getMultilineInputDefaultBackground(theme),
        textIndent,
    });

export const inputTitleStyles: SxProps<Theme> = (theme) => ({
    position: 'absolute',
    zIndex: 'fab',
    p: .5,
    pl: 0,
    background: theme.palette.background.paper,
});

import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

import { INNER_BORDER_WIDTH, commonInputStyles, multilineInputStyles } from '../../styles';

export const codeWrapperStyles: SxProps = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
};

export const formHeaderInputPropsSx: SxProps<Theme> = multilineInputStyles;

export const formHeaderTitleContentStyles: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
};

export const formHeaderInputStyles = commonInputStyles;

export const formHeaderStyles: SxProps = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 4,
};

export const formHeaderItemStyles: SxProps = {
    border: `${INNER_BORDER_WIDTH}px solid`,
    p: .5,
    m: `-${INNER_BORDER_WIDTH}px`,
};

export const formHeaderItemWithTitleStyles: SxProps = {
    ...formHeaderItemStyles,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
};

export const formHeaderTitleStyles: SxProps = {
    textAlign: 'center',
    p: 2,
    borderBottom: `${INNER_BORDER_WIDTH}px solid`,
    m: -.5,
};

export const orderWrapperStyles: SxProps<Theme> = (theme) => ({
    display: 'grid',
    gridTemplateColumns: `2fr ${theme.spacing(5)} 1fr`,
});

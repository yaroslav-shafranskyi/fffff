import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

import { DEFAULT_LINE_HEIGHT, getMultilineInputDefaultBackground } from '../../constants';

export const containerStyles: SxProps = {
    width: '100%',
    p: 2,
    bgcolor: 'background.paper',
    minHeight: '100vh',
};

export const headerStyles: SxProps = {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
};

export const militaryBaseWrapperStyles: SxProps<Theme> = (theme) => ({
    border: `1px solid ${theme.palette.divider}`,
    py: 1,
    px: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
});

export const inlineInputWrapper: SxProps = {
    display: 'grid',
    gap: .5,
    gridTemplateColumns: 'auto 1fr',
};

export const codeWrapper: SxProps = {
    ...inlineInputWrapper,
    width: '100%',
};

export const headerInputPropsSx: SxProps = {
    textAlign: 'center',
};

export const numberWrapperStyles: SxProps = {
    ...inlineInputWrapper,
    width: 'fit-content',
    margin: 'auto',
    alignItems: 'baseline',
};

export const numberInputStyles: SxProps<Theme> = (theme) => ({
    width: theme.spacing(9),
});

export const numberInputPropsSx: SxProps = {
    fontSize: 'x-large',
    fontWeight: 'bold',
};

export const mainHeaderWrapper: SxProps = {
    p: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
};

export const patientInputPropsSx: SxProps<Theme> = (theme) => ({
    background: getMultilineInputDefaultBackground(theme),
    lineHeight: `${DEFAULT_LINE_HEIGHT}px`,
    marginBottom: '-5px',
    overflow: 'hidden',
});

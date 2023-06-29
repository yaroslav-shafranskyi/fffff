import { SxProps } from "@mui/material";
import { Theme } from "@mui/system";

import { contentTitleWrapperStyles } from '../commonFormStyles';

export const titleWrapperStyles: SxProps = {
    ...contentTitleWrapperStyles,
    p: 0,
    px: 2,
};

export const contentWrapperStyles: SxProps = {
    p: 1,
    borderBottom: '1px solid',
};

export const footerStyles: SxProps = {
    display: 'flex',
    justifyContent: 'space-between',
};

export const mpWrapperStyles: SxProps<Theme> = (theme) => ({
    height: theme.spacing(6),
    width: theme.spacing(18),
    display: 'flex',
    alignItems: 'center',
});

export const signaturesWrapperStyles: SxProps = {
    width: 'fit-content',
    float: 'right',
};

export const signatureStyles: SxProps = {
    display: 'grid',
    gridAutoFlow: 'column',
    gap: 2,
};

export const signatureInputWrapperStyles: SxProps = {
    display: 'grid',
    pr: 1,
};

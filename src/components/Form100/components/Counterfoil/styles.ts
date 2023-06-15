import { SxProps } from "@mui/material";

export const titleStyles: SxProps = {
    fontWeight: 'bold',
};

export const titleWrapperStyles: SxProps = {
    textAlign: 'center',
    borderBottom: '2px solid',
    borderColor: 'text.primary',
};

export const evacuationWrapperStyles: SxProps = {
    border: '1.5px solid',
    borderColor: 'text.primary',
    ml: 2,
    display: 'grid',
    gridTemplateColumns: '2fr 3fr',
};

export const evacuationClinicWrapperStyles: SxProps = {
    display: 'grid',
    gridTemplateRows: '1fr 3fr 1fr',
};

export const evacuationClinicTipWrapperStyles: SxProps = {
    borderTop: '1.5px solid',
    textAlign: 'center',
};

export const medicalHelpAndInjuryTypeWrapperStyles: SxProps = {
    display: 'grid',
    gridTemplateColumns: '3fr 24px 2fr',
    height: 'auto',
};

export const medicalHelpAndInjutyTypeTipStyles: SxProps= {
    writingMode: 'vertical-lr',
    textOrientation: 'upright',
    mt: 3,
    borderBlock: '1.5px solid',
};

export const backWrapperStyles: SxProps = {
    p:2,
    pt: 3,
};

export const backTitleStyles: SxProps = {
    ...titleStyles,
    textAlign: 'center',
    borderBottom: '4px solid',
    pb: 2,
};

export const carriedByStyles: SxProps = {
    position: 'absolute',
    pr: 1.5,
    left: 0,
};

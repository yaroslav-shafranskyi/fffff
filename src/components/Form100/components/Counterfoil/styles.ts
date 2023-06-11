import { SxProps } from "@mui/material";

export const titleStyles: SxProps = {
    fontWeight: 'bold',
};

export const titleWrapperStyles: SxProps = {
    textAlign: 'center',
    borderBottom: '2px solid',
    borderColor: 'text.primary',
};

export const dateWrapperStyles: SxProps = {
    textAlign: 'center',
};

export const displayFlexStyles: SxProps = {
    display: 'flex', 
};

export const reasonWrapperStyles: SxProps = {
    ...displayFlexStyles,
    gridColumnGap: 2,
};

export const injuryReasonWrapper: SxProps = {
    cursor: 'pointer',
    display: 'flex',
};

export const dateNumberInputStyles: SxProps = {
    width: 18,
    p: 0,
};

export const reasonAndNewRecordDateWrapperStyles: SxProps = {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gridColumnGap: 4,
    padding: '0 4px',
};

export const evacuationWrapperStyles: SxProps = {
    border: '1.5px solid',
    borderColor: 'text.primary',
    ml: 2,
    display: 'grid',
    gridTemplateColumns: '2fr 3fr',
};

export const evacuationTransportWrapperStyles: SxProps = {
    borderRight: '1.5px solid',
    textAlign: 'center',
};

export const evacuationTransportOptionsRowWrapperStyles: SxProps = {
    display: 'flex',
    justifyContent: 'space-around',
};

export const evacuationClinicWrapperStyles: SxProps = {
    display: 'grid',
    gridTemplateRows: '1fr 3fr 1fr',

};

export const evacuationClinicTitleWrapperStyles: SxProps = {
    borderBottom: '1.5px solid',
    textAlign: 'center',
};

export const evacuationClinicTipWrapperStyles: SxProps = {
    borderTop: '1.5px solid',
    textAlign: 'center',
};

export const evacuationClinicOptionsWrapperStyles: SxProps = {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    '& :last-child': {
        borderRight: 'none'
    },
};

export const evacuationClinicStyles: SxProps = {
    borderRight: '1.5px solid',
    textAlign: 'center',
    wordBreak: 'break-all',
    cursor: 'pointer',
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

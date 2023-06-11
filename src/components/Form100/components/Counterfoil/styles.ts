import { SxProps } from "@mui/material";
import { Theme } from "@mui/system";

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

export const rowStyles: SxProps = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridColumnGap: 4,
    padding: '0px 4px',
};

export const columnStyles: SxProps = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gridColumnGap: 4,
    overflow: 'hidden'
};

export const fieldNameStyles: SxProps = {
    minWidth: 'fit-content',
};

export const singleElementRowStyles: SxProps = {
    width: '100%',
    padding: '0 4px',
};

export const fullNameTitleStyles: SxProps = {
    display: 'flex',
    justifyContent: 'space-around',
};

export const fullWidthInputStyles: SxProps = {
    p: 0, 
    width: 'calc(100% - 4px)'
};

export const severalFieldsRowStyles: SxProps = {
    display: 'flex',
    justifyContent: 'space-between',
    gridColumnGap: 4,
    padding: '0px 4px',
};

export const cursorPointerStyles: SxProps = {
    cursor: 'pointer'
};

export const displayFlexStyles: SxProps = {
    display: 'flex', 
};

export const reasonWrapperStyles: SxProps = {
    ...displayFlexStyles,
    gridColumnGap: 2,
};

export const injuryReasonWrapper: SxProps = {
    ...cursorPointerStyles, ...displayFlexStyles
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

export const medicalHelpWrapperStyles: SxProps<Theme> = (theme) => ({
    border: '1.5px solid',
    borderLeft: 'none',
    borderBottom: 'none',
    height: `calc(100% - ${theme.spacing(3)})`,
});

export const medicalPreparationsWrapperStyles: SxProps = {
    display: 'grid',
    gridTemplateColumns: '5fr 3fr',
};

export const preparationGroupWrapperStyles: SxProps = {
    borderRight: '1.5px solid',
    marginRight: '-0.5px',
};

export const preparationCellCommonStyles: SxProps = {
    borderBottom: '1.5px solid',
};

export const preparationCellWrapperStyles: SxProps = {
    ...preparationCellCommonStyles,
    pl: .5,
};

export const operationCellWrapperStyles: SxProps = {
    ...preparationCellWrapperStyles,
    display: 'flex',
};

export const twoOperationsCellWrapperStyles: SxProps = {
    ...operationCellWrapperStyles,
    gridColumnGap: 2
};

export const preparationGroupTitleStyles: SxProps = {
    ...preparationCellCommonStyles,
    textAlign: 'center',
};

export const dozeInputStyles: SxProps = {
    bottom: '-1.5px',
};

export const injuryTypeWrapperStyles: SxProps = {

};

export const injuryCellCommonStyles: SxProps = {
    display: 'grid',
    gridTemplateColumns: '3fr 1fr',
};

export const injuryTypeCellStyles: SxProps = {
    ...injuryCellCommonStyles,
    borderBottom: '1.5px solid',
};

export const injuryTypeTitleCellStyles: SxProps = {
    ...injuryCellCommonStyles,
};

export const medicalHelpAndInjutyTypeTipStyles: SxProps= {
    writingMode: 'vertical-lr',
    textOrientation: 'upright',
    pt: 3,
};

export const diagnosisStyles: SxProps = {
    pl: .5,
    display: 'flex'
};

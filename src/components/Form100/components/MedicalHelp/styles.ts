import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

export const medicalHelpWrapperStyles: SxProps<Theme> = (theme) => ({
    borderTop: '1.5px solid',
    height: `calc(100% - ${theme.spacing(3)})`,
});

export const preparationRowStyles: SxProps = {
    display: 'grid',
    gridTemplateColumns: '5fr 3fr',
    borderBottom: '1.5px solid',
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
    textAlign: 'center',
};

export const preparationNamesTitleStyles: SxProps = {
    ...preparationGroupTitleStyles,
    borderRight: '1.5px solid',
};

export const dozeInputStyles: SxProps = {
    bottom: '-.5px',
    height: '100%',
};

import { SxProps } from '@mui/material';

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

export const injuryCellStyles: SxProps = {
    border: '1.5px solid',
    borderLeft: 'none',
    '& :last-child': { 
        borderBottom: 'none' 
    }
};

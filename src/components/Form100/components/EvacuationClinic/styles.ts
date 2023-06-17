import { SxProps } from "@mui/material";

export const evacuationClinicTitleWrapperStyles: SxProps = {
    borderBottom: '1.5px solid',
    textAlign: 'center',
};

export const getEvacuationClinicStyles = (readonly?: boolean): SxProps => ({
    borderRight: '1.5px solid',
    textAlign: 'center',
    wordBreak: 'break-all',
    cursor: !readonly ? 'pointer' : 'inherit',
});

export const evacuationClinicOptionsWrapperStyles: SxProps = {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    height: '100%',
    '& div:last-of-type': {
        borderRight: 'none'
    },
};

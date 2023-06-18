import { SxProps } from "@mui/material";
import { Theme } from "@mui/system";

export const evacuationClinicTitleWrapperStyles: SxProps = {
    borderBottom: '1.5px solid',
    textAlign: 'center',
};

export const getEvacuationClinicStyles = (selected: boolean | 'first', readonly?: boolean): SxProps<Theme> => (theme) => ({
    borderRight: '1.5px solid',
    textAlign: 'center',
    wordBreak: 'break-all',
    cursor: !readonly ? 'pointer' : 'inherit',
    position: 'relative',
    ':after': selected === true ? {
        content: `''`,
        position: 'absolute',
        left: 0,
        height: 0,
        borderLeft: `${theme.spacing(1)} solid ${theme.palette.text.primary}`,
        borderTop: `${theme.spacing(1)} solid transparent`,
        borderBottom: `${theme.spacing(1)} solid transparent`,
        top: '50%',
        transform: 'translateY(-50%)',
    } : {},
});

export const evacuationClinicOptionsWrapperStyles: SxProps = {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    height: '100%',
    '& div:last-of-type': {
        borderRight: 'none'
    },
};

import { SxProps } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Theme } from "@mui/system";

export const cardStyles: SxProps = {
    m: 2,
    p: 2,
    display: 'grid',
    gap: 2,
};

export const rowStyles: SxProps = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 2,
};

export const fullNameRowStyles: SxProps = {
    ...rowStyles,
    gridTemplateColumns: '3fr 2fr 2fr',
};

export const idRowStyles: SxProps = {
    ...rowStyles,
    gridTemplateColumns: '3fr 3fr 1fr',
}

export const inputPropsSx: SxProps = {
    display: 'flex',
    alignItems: 'center',
};

export const genderWrapperStyles: SxProps = {
    ml: 2,
};

export const radioStyles: SxProps<Theme> = (theme) => ({
    height: theme.spacing(3.5),
});

export const recordsTitleWrapperStyles: SxProps = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

export const newRecordWrapperStyles: SxProps = {
    border: `1.5px solid ${grey[500]}`,
    borderRadius: 'inherit',
    p: 1,
    position: 'relative',
    display: 'grid',
    gap: 1
};

export const newRecordLabelStyles: SxProps<Theme> = (theme) => ({
    position: 'absolute',
    top: theme.spacing(-1.5),
    left: theme.spacing(1),
    bgcolor: 'background.paper',
});

export const newRecordContentStyles: SxProps = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
};

export const newRecordButtonStyles: SxProps = {
    width: 'fit-content',
    justifySelf: 'end',
};

export const fullWidthStyles: SxProps = {
    width: '100%',
};

export const selectStyles: SxProps = {
    '& p': {
        position: 'relative',
    },
};

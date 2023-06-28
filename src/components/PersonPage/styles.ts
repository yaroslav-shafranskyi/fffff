import { SxProps } from "@mui/material";
import { Theme } from "@mui/system";

export const cardStyles: SxProps = {
    p: 2,
    display: 'grid',
    gap: 2,
};

export const containerStyles: SxProps = {
    py: 2,
    minHeight: '100vh',
    bgcolor: 'background.paper',
};

export const infoWrapperStyles: SxProps = {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: 2,
};

export const infoLeftSectionStyles: SxProps = {
    display: 'grid',
    gap: 2,
};

export const infoLeftSectionRowStyles: SxProps = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 2,
};

export const infoColumnStyles: SxProps = {
    display: 'grid',
    gap: 2,
};

export const inputPropsSx: SxProps = {
    display: 'flex',
    alignItems: 'center',
};

export const genderWrapperStyles: SxProps = {
   gap: 2,
   mt: 2,
};

export const radioStyles: SxProps<Theme> = (theme) => ({
    height: theme.spacing(3.5),
});

export const fullWidthStyles: SxProps = {
    width: '100%',
};

export const selectStyles: SxProps = {
    '& p': {
        position: 'relative',
    },
};

export const historyTitleWrapper: SxProps = {
    display: 'flex',
    justifyContent: 'space-between',
};

export const getMenuIconStyles = (isMenuOpen?: boolean): SxProps => ({
    ml: -.5,
    transform: isMenuOpen ? 'rotate(90deg)' : 'none',
});

export const timelineContentWrapperStyles: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    gap: 1
};

export const recordDiagnosisStyles: SxProps<Theme> = (theme) => ({
    border: '1px solid',
    p: 1,
    borderColor: theme.palette.divider,
    borderRadius: theme.shape.borderRadius * .25,
});

export const formIconStyles: SxProps<Theme> = (theme) => ({
    width: theme.spacing(2),
});

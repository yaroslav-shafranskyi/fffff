import { SxProps } from "@mui/system";

export const bodyDamageInfoWrapperStyles: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

export const bodyDamageWrapperStyles: SxProps = {
    ...bodyDamageInfoWrapperStyles,
    width: 'min-content',
};

export const bodyImageTipWrapperStyles: SxProps = {
    position: 'absolute',
    width: 'min-content',
};

export const bodyImageTipStyles: SxProps = {
    textAlign: 'center',
};

export const bodyImagesWrapperStyles: SxProps = {
    position: 'relative',
    display: 'flex',
};

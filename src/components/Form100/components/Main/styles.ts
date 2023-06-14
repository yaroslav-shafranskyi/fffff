import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

export const containerStyles: SxProps<Theme> = (theme) => ({
    display: 'grid',
    gridTemplateColumns: `${theme.spacing(4)} auto ${theme.spacing(4)}`,
});

export const leftBorderStyles: SxProps<Theme> = (theme) => ({
    background: 'black',
    color: 'background.paper',
    writingMode: 'vertical-lr',
    textOrientation: 'upright',
    display: 'flex',
    justifyContent: 'center',
    ml: -.5,
    width: `calc(100% + ${theme.spacing(.5)}px)`,
});

export const centralSectionWraperStyles: SxProps<Theme> = (theme) => ({
    display: 'grid',
    gridTemplateRows: `${theme.spacing(4)} auto auto ${theme.spacing(4)}`,
});

export const topBorderStyles: SxProps = ({
    display: 'flex',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: '1.5px solid',
});

export const mainSectionStyles: SxProps = {
    display: 'grid',
    gridTemplateColumns: '3fr 2fr',
};

export const mainTitleStyles: SxProps = {
    textAlign: 'center',
    fontWeight: 'bold',
};

export const injuryWrapperStyles: SxProps = {
    display: 'grid',
    width: '80%',
    gridTemplateColumns: '2fr 3fr',
};

export const sanitaryStatusWrapperStyles: SxProps = {
    width: 'fit-content',
    margin: 'auto',
};

export const evacuationTypeWrapperStyles: SxProps = {
    border: '1.5px solid',
    borderRight: 'none',
    display: 'flex',
};

export const evacuationTypeTipStyles: SxProps = {
    lineHeight: 0,
};

export const evacuationPriorityWrapperStyles: SxProps = {
    borderBottom: '1.5px solid',
    display: 'flex',
    gap: .5,
    justifyContent: 'center',
};

export const evacuationPriorityOptionsWrapperStyles: SxProps = {
    display: 'flex',
    gap: .5,
};

export const evacuationTransportWrapperStyles: SxProps = {
    display: 'flex',
    border: '1.5px solid',
    borderRight: 'none',
    '& :last-child': {
        borderRight: 'none',
    },
    mt: .5,
};

export const evacuationTransportCellStyles:SxProps = {
    borderRight: '1.5px solid',
    cursor: 'pointer',
    width: '100%',
};

export const signatureWrapperStyles: SxProps = {
    display: 'flex',
    justifyContent: 'end',
    gap: .5,
};

export const bottomBorderStyles: SxProps<Theme> = (theme) => ({
    display: 'flex',
    backgroundColor: theme.palette.primary.main,
    alignItems: 'baseline',
    justifyContent: 'center',
    borderTop: '1.5px solid',
    fontWeight: 'bold',
    alignSelf: 'end',
});

export const rightBorderStyles: SxProps = {
    background: 'yellow',
    writingMode: 'vertical-lr',
    textOrientation: 'upright',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeft: '1.5px solid',
};

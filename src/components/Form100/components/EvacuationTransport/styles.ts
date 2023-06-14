import { SxProps } from "@mui/system";

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

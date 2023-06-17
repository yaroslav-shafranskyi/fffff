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

export const getEvacuationTransportCellStyles = (readonly?: boolean):SxProps => ({
    borderRight: '1.5px solid',
    cursor: readonly ? 'inherit' : 'pointer',
    width: '100%',
});

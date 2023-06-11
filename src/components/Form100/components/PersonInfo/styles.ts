import { SxProps } from "@mui/system";

export const rowStyles: SxProps = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridColumnGap: 4,
    padding: '0px 4px',
};

export const columnStyles: SxProps = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gridColumnGap: 4,
    overflow: 'hidden'
};

export const fieldNameStyles: SxProps = {
    minWidth: 'fit-content',
};

export const fullNameTitleStyles: SxProps = {
    display: 'flex',
    justifyContent: 'space-around',
};

export const fullWidthInputStyles: SxProps = {
    p: 0, 
    width: 'calc(100% - 4px)'
};

export const singleElementRowStyles: SxProps = {
    width: '100%',
    padding: '0 4px',
};

export const severalFieldsRowStyles: SxProps = {
    display: 'flex',
    justifyContent: 'space-between',
    gridColumnGap: 4,
    padding: '0px 4px',
};

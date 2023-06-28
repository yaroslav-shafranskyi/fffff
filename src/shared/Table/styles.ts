import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

export const tableStyles: SxProps = {
    minHeight: 300,
    tableLayout: 'fixed',
};

export const placeholderStyles = {
    position: 'absolute',
    borderBottom: 'none',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
};

export const headerStyles: SxProps<Theme> = (theme) => ({
    height: theme.spacing(6),
    '& th:first-of-type': {
        pl: 1,
    },
    '& th:last-of-type': {
        pr: 1,
    },
});

export const headerCellStyles = {
    px: .25,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '& p:first-of-type': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
};

export const toolbarWrapperStyles: SxProps = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
};

export const titleWrapperStyles: SxProps = {
    display: 'flex',
    justifyContent: 'start',
    gap: 2,
};

export const columnsFiltersButtonStyles: SxProps = {
    bgcolor: 'grey[500]',
    color: 'background.default',
};

export const filtersPopoverStyles: SxProps<Theme> = (theme) => ({
    top: theme.spacing(-2),
});

export const filtersMenuStyles: SxProps<Theme> = (theme) => ({
    padding: theme.spacing(2),
    borderRadius: 0,
    gap: theme.spacing(2),
    display: 'grid',
    maxHeight: '100vh',
});

export const columnsFiltersHeaderStyles: SxProps = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

export const filterGroupWrapperStyles: SxProps = {
    display: 'grid',
    gap: 2,
    pb: 2,
};

export const filterFieldWrapperStyles: SxProps = {
    display: 'grid',
    gap: 1,
};

export const sortSelectStyles: SxProps<Theme> = (theme) => ({
    height: theme.spacing(5),
    width: '100%',
});

export const datePickerStyles: SxProps<Theme> = (theme) => ({
    '& .MuiInputBase-root': {
        height: theme.spacing(5),
    },
});

export const sortSelectTitleStyles: SxProps<Theme> = (theme) => ({
    position: 'absolute',
    top: theme.spacing(1),
    left: theme.spacing(1),
});

export const dateRangeFilterPickerStyles: SxProps = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
};

export const dateRangePickerStyles: SxProps<Theme> = (theme) => ({
    width: theme.spacing(15),
    p: 0,
    '& .MuiInputBase-root': {
        height: theme.spacing(5),
        width: theme.spacing(15),
        '& button': {
            width: 20,
            height: 20,
        },
        '& input': {
            p: .5,
        },
    },
});

export const optionsFilterWrapperStyles: SxProps = {
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',
};

export const tableRowStyles: SxProps<Theme> = (theme) => ({
    position: 'relative',
    cursor: 'pointer',
    '&:hover': {
        boxShadow: (theme.shadows as string[])[2]
    }
})
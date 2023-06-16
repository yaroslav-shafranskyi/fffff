import { SxProps } from "@mui/system";

import { commonWrapperStyles } from "../../styles";

export const formWrapperStyles: SxProps = {
    ...commonWrapperStyles,
    gridTemplateColumns: '1fr 2fr',
    lineHeight: '0.6rem',
    '& p': {
        fontSize: '0.6rem',
    },
    '& input': {
        fontSize: '0.6rem',
    },
};

import { useFormContext } from "react-hook-form";
import { Box, Typography } from '@mui/material';

import { backHeaderStyles, backWrapperStyles } from "./styles";
import { Stage } from "../Stage";

export const MainBack = () => {
    return (
        <Box sx={backWrapperStyles}>
            <Box sx={backHeaderStyles}>
                <Stage />
            </Box>
            <Box>

            </Box>
        </Box>
    );
};

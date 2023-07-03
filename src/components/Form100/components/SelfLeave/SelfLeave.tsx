import { useFormContext } from "react-hook-form";
import { Box, Typography, Checkbox } from '@mui/material';

import { IForm100 } from "../../../../api";

import { wrapperStyles } from "./styles";

export const SelfLeave = () => {
    const { getValues, setValue } = useFormContext<IForm100>();

    const selfLeave = getValues('selfLeave');

    const handleChange = () => {
        setValue('selfLeave', !selfLeave);
    }

    return (
        <Box sx={wrapperStyles}>
            <Typography>
                Вийшов самостійно
            </Typography>
            <Checkbox value={selfLeave} onChange={handleChange} />
        </Box>
    );
};

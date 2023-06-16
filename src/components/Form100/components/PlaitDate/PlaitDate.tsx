import { useCallback } from "react";
import {  useFormContext } from "react-hook-form";
import { Box, Typography } from '@mui/material';

import { IForm100 } from "../../../../api";
import { DateInputWithSeparatedFields } from "../../../../shared";

import { displayFlexStyles, boldTextStyles } from "../../styles";

export const PlaitDate = () => {
    const { watch, setValue } = useFormContext<IForm100>();
    
    const plait = watch('plait');

    const handleChange = useCallback((date: Date) => {
        setValue('plait', date);
    }, [setValue]);

    return (
        <Box sx={displayFlexStyles}>
            <Typography sx={boldTextStyles}>
                Джгут накладений
            </Typography>
            <DateInputWithSeparatedFields date={plait} onChange={handleChange} />
        </Box>
    )
}
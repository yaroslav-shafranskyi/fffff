import { ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";
import { Box, Typography } from "@mui/material";

import { Input } from "../../../../shared";
import { IForm100 } from "../../../../api";

import { wrapperStyles } from "./styles";

export const CarriedBy = () => {
    const { getValues, setValue } = useFormContext<IForm100>();

    const carriedBy = getValues('carriedBy');

    const updateCarriedBy = (event: ChangeEvent<HTMLInputElement>) => {
        setValue('carriedBy', event.target.value);
    };

    return (
        <Box sx={wrapperStyles}>
            <Typography>
                Винесений (ким)
            </Typography>
            <Input value={carriedBy} onChange={updateCarriedBy} />
        </Box>
    );
};

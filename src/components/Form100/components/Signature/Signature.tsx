import { useFormContext } from "react-hook-form";
import { Box, Typography } from '@mui/material';

import { Input } from "../../../../shared";
import { IForm100 } from "../../../../api";
import { ChangeEvent } from "react";

export const Signature = () => {
    const { getValues, setValue } = useFormContext<IForm100>();

    const signature = getValues('signature');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue('signature', event.target.value);
    };

    return (
        <Box sx={{ textAlign: 'center' }}>
            <Input fullWidth={true} value={signature} onChange={handleChange} />
            <Typography variant='caption'>
                підпис (розбірливо)
            </Typography>
        </Box>
    );
};

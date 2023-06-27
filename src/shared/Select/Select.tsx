import { FC, forwardRef } from 'react';
import { Select as MuiSelect, Typography, MenuItem, FormControl, InputLabel } from "@mui/material";

import { ISelectProps } from "./types";

export const Select: FC<ISelectProps> = forwardRef((props, ref) => {
    const { error, options, label, inputProps } = props;
    return <FormControl fullWidth={true}>
        <InputLabel>{label}</InputLabel>
        <MuiSelect
            ref={ref}
            IconComponent={() => null}
            variant='standard'
            fullWidth={true}
            displayEmpty={true}
            sx={{ p: 0 }}
            {...props}
            inputProps={{ sx: { p: 0 }, ...inputProps }}
            error={error !== undefined}
        >
            {options.map(option => <MenuItem value={option} key={option}>{option}</MenuItem>)}
        </MuiSelect>
        {error && <Typography color='error'>{error}</Typography>}
    </FormControl>
});

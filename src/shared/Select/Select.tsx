import { FC } from 'react';
import { Select as MuiSelect, Typography, MenuItem } from "@mui/material";

import { ISelectProps } from "./types";

export const Select: FC<ISelectProps> = (props) => {
    const { error, options, inputProps } = props;
    return <>
        <MuiSelect
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
        {error && <Typography color='error' sx={{ position: 'absolute' }}>{error}</Typography>}
    </>
}

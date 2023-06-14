import { ChangeEvent } from "react";
import {  useFormContext } from "react-hook-form";
import { Box, Typography } from '@mui/material';

import { IForm100 } from "../../../../api";
import { Input } from "../../../../shared";
import { IDateData } from "../../../../interfaces";
import { emptyDateData } from "../../../../constants";

import { displayFlexStyles, dateNumberInputStyles, boldTextStyles } from "../../styles";

export const PlaitDate = () => {
    const { watch, setValue } = useFormContext<IForm100>();
    
    const plait = watch('plait');
    const { hours, minutes, day, month, year } = plait ?? emptyDateData;

    const handleChange = (field: keyof IDateData) =>  (event: ChangeEvent<HTMLInputElement>) => {
        setValue(`plait.${field}`, event.target.value);
    }

    return (
        <Box sx={displayFlexStyles}>
            <Typography sx={boldTextStyles}>
                Джгут накладений
            </Typography>
            <Typography>
                <Input
                    value={hours}
                    sx={dateNumberInputStyles}
                    onChange={handleChange('hours')}
                /> год. 
                <Input
                    value={minutes}
                    sx={dateNumberInputStyles}
                    onChange={handleChange('minutes')}
                /> {`хв. `}
                <Input 
                    value={day}
                    sx={dateNumberInputStyles}
                    onChange={handleChange('day')} 
                />. 
                <Input 
                    value={month}
                    sx={dateNumberInputStyles}
                    onChange={handleChange('month')}
                />.
                20<Input 
                    value={year}
                    sx={dateNumberInputStyles}
                    onChange={handleChange('year')}
                />р. 
            </Typography>
        </Box>
    )
}
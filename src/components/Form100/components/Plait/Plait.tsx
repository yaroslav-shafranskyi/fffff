import { useCallback, FC } from "react";
import { useFormContext } from "react-hook-form";
import { Box, Typography } from '@mui/material';

import { IForm100 } from "../../../../api";
import { DateInputWithSeparatedFields } from "../../../../shared";
import { IFCPropsWithReadonly } from "../../../../interfaces";

import { displayFlexStyles, boldTextStyles } from "../../styles";

import { getPlaitStatusWrapperStyles } from "./styles";

export const Plait: FC<IFCPropsWithReadonly> = ({ readonly }) => {
    const { formState, watch, setValue } = useFormContext<IForm100>();
    
    const { date: plaitDate, status: plaitStatus} = watch('plait') ?? {};

    const error = formState.errors.plait?.date?.message;

    const handlePlaitStatusChange = useCallback(() => {
        if (readonly) {
            return;
        }
        if (plaitStatus) {
            setValue('plait', undefined);
            return;
        }
        setValue('plait.status', true)
    }, [plaitStatus, readonly, setValue]);

    const handleChange = useCallback((date: Date) => {
        if (readonly) {
            return;
        }
        setValue('plait.date', date);
        setValue('plait.status', true)
    }, [readonly, setValue]);

    return (
        <Box>
            <Box sx={displayFlexStyles}>
                <Typography sx={boldTextStyles}>
                    Джгут
                </Typography>
                <Box sx={getPlaitStatusWrapperStyles(readonly)} onClick={handlePlaitStatusChange}>
                    <Typography sx={boldTextStyles} color={plaitStatus ? 'error' : 'textPrimary'}>
                        накладений
                    </Typography>
                </Box>
                <Box>
                    <DateInputWithSeparatedFields date={plaitDate} onChange={handleChange} />
                    {error && <Typography color='error'>{error}</Typography>}
                </Box>
            </Box>
        </Box>
    )
}
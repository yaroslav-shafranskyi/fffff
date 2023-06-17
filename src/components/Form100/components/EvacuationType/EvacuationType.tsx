import { FC, useCallback } from 'react';
import { useFormContext } from "react-hook-form";
import { Box, Typography } from '@mui/material';

import { EvacuationType, IForm100 } from "../../../../api";
import { EvacuationLayIcon, EvacuationSitIcon } from "../../../../assets";
import { IFCPropsWithReadonly } from '../../../../interfaces';

import { evacuationTypeWrapperStyles } from "./styles";

export const EvacuationTypeComponent: FC<IFCPropsWithReadonly> = ({ readonly }) => {
    const { formState, watch, setValue, clearErrors } = useFormContext<IForm100>();

    const evacuationType = watch('evacuation.type');

    const error = formState.errors.evacuation?.clinic?.message;

    const updateEvacuationType = useCallback((value: EvacuationType) => () => {
        if (readonly) {
            return
        }
        setValue('evacuation.type', value);
        clearErrors('evacuation.type');
    }, [clearErrors, readonly, setValue]);
    
    const getEvacuationFieldStyles = useCallback((value: EvacuationType) => {
        const bgcolor = value === evacuationType ? 'primary.main' : 'background.paper';
        const cursor = readonly ? 'inherit' : 'pointer';
        return { cursor, bgcolor };
    }, [evacuationType, readonly]);

    return (
        <Box>
            <Box sx={evacuationTypeWrapperStyles}>
                <Box 
                    sx={getEvacuationFieldStyles(EvacuationType.LAY)}
                    onClick={updateEvacuationType(EvacuationType.LAY)}
                >
                    <EvacuationLayIcon />
                    <Typography>
                        лежачи
                    </Typography>
                </Box>
                <Box
                    sx={getEvacuationFieldStyles(EvacuationType.SIT)}
                    onClick={updateEvacuationType(EvacuationType.SIT)}
                >
                    <EvacuationSitIcon />
                    <Typography>
                        сидячи
                    </Typography>
                </Box>
            </Box>
            {error && <Typography color='error' sx={{ position: 'absolute' }}>{error}</Typography>}
        </Box>
    );
};

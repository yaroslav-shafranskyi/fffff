import { FC, useCallback } from 'react';
import { useFormContext } from "react-hook-form";
import { Box, Typography } from '@mui/material';

import { EvacuationPriority, IForm100 } from "../../../../api";
import { IFCPropsWithReadonly } from "../../../../interfaces";

import { cursorPointerStyles, displayFlexStyles } from "../../styles";

import { evacuationPriorityOptionsWrapperStyles, evacuationPriorityWrapperStyles } from "./styles";

export const EvacuationPriorityComponent: FC<IFCPropsWithReadonly> = ({ readonly }) => {
    const { formState, getValues, setValue, clearErrors } = useFormContext<IForm100>();

    const priority = getValues('evacuation.priority');

    const updatePriority = useCallback((value: EvacuationPriority) => () => {
        if (readonly) {
            return;
        }
        setValue('evacuation.priority', value)
        clearErrors('evacuation.priority');
    }, [clearErrors, readonly, setValue])

    const getEvacuationFieldColor = (value: EvacuationPriority) => value === priority ? 'error' : 'textPrimary';

    const error = formState.errors.evacuation?.priority?.message;

    const clickableBoxStyles = readonly ? {} : cursorPointerStyles;

    return (
        <Box>
            <Box sx={evacuationPriorityWrapperStyles}>
                <Typography>
                    Черговість евакуації:
                </Typography>
                <Box sx={evacuationPriorityOptionsWrapperStyles}>
                    <Box sx={displayFlexStyles}>
                        <Box sx={clickableBoxStyles} onClick={updatePriority('I')}>
                            <Typography color={getEvacuationFieldColor('I')}>
                                I
                            </Typography>
                        </Box>{', '}
                    </Box>
                    <Box sx={displayFlexStyles}>
                        <Box sx={clickableBoxStyles} onClick={updatePriority('II')}>
                            <Typography color={getEvacuationFieldColor('II')}>
                                II
                            </Typography>
                        </Box>{', '}
                    </Box>
                    <Box sx={clickableBoxStyles} onClick={updatePriority('III')}>
                        <Typography color={getEvacuationFieldColor('III')}>
                            III
                        </Typography>
                    </Box>
                </Box>
            </Box>
            {error && <Typography color='error' sx={{ textAlign: 'center' }}>{error}</Typography>}
        </Box>
    );
};

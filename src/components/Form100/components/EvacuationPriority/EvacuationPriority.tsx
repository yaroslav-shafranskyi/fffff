import { useFormContext } from "react-hook-form";
import { Box, Typography } from '@mui/material';

import { EvacuationPriority, IForm100 } from "../../../../api";

import { cursorPointerStyles, displayFlexStyles } from "../../styles";

import { evacuationPriorityOptionsWrapperStyles, evacuationPriorityWrapperStyles } from "./styles";

export const EvacuationPriorityComponent = () => {
    const { watch, setValue } = useFormContext<IForm100>();

    const priority = watch('evacuation.priority');

    const updatePriority = (value: EvacuationPriority) => () => {
        setValue('evacuation.priority', value)
    }

    const getEvacuationFieldColor = (value: EvacuationPriority) => value === priority ? 'error' : 'textPrimary';


    return (
        <Box sx={evacuationPriorityWrapperStyles}>
            <Typography>
                Черговість евакуації:
            </Typography>
            <Box sx={evacuationPriorityOptionsWrapperStyles}>
                <Box sx={displayFlexStyles}>
                    <Box sx={cursorPointerStyles} onClick={updatePriority('I')}>
                        <Typography color={getEvacuationFieldColor('I')}>
                            I
                        </Typography>
                    </Box>{', '}
                </Box>
                <Box sx={displayFlexStyles}>
                    <Box sx={cursorPointerStyles} onClick={updatePriority('II')}>
                        <Typography color={getEvacuationFieldColor('II')}>
                            II
                        </Typography>
                    </Box>{', '}
                </Box>
                <Box sx={cursorPointerStyles} onClick={updatePriority('III')}>
                    <Typography color={getEvacuationFieldColor('III')}>
                        III
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

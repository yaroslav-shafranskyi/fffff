import { useFormContext } from "react-hook-form";
import { Box, Typography } from '@mui/material';

import { EvacuationType, IForm100 } from "../../../../api";
import { EvacuationLayIcon, EvacuationSitIcon } from "../../../../assets";

import { evacuationTypeTipStyles, evacuationTypeWrapperStyles } from "./styles";

export const EvacuationTypeComponent = () => {
    const { watch, setValue } = useFormContext<IForm100>();

    const evacuationType = watch('evacuation.type');

    const updateEvacuationType = (value: EvacuationType) => () => {
        setValue(`evacuation.type`, value)
    }
    const getEvacuationFieldBg = (value: EvacuationType) => value === evacuationType ? 'primary.main' : 'background.paper';

    return (
        <Box sx={evacuationTypeWrapperStyles}>
            <Box 
                sx={{ cursor: 'pointer', bgcolor: getEvacuationFieldBg(EvacuationType.LAY) }}
                onClick={updateEvacuationType(EvacuationType.LAY)}
            >
                <EvacuationLayIcon />
                <Typography sx={evacuationTypeTipStyles}>
                    лежачи
                </Typography>
            </Box>
            <Box
                sx={{ cursor: 'pointer', bgcolor: getEvacuationFieldBg(EvacuationType.SIT) }}
                onClick={updateEvacuationType(EvacuationType.SIT)}
            >
                <EvacuationSitIcon />
                <Typography sx={evacuationTypeTipStyles}>
                    сидячи
                </Typography>
            </Box>
        </Box>
    );
};

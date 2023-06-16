import { useFormContext } from "react-hook-form";
import { Box, Typography } from '@mui/material';

import { EvacuationType, IForm100 } from "../../../../api";
import { EvacuationLayIcon, EvacuationSitIcon } from "../../../../assets";

import { evacuationTypeWrapperStyles } from "./styles";

export const EvacuationTypeComponent = () => {
    const { formState, watch, setValue } = useFormContext<IForm100>();

    const evacuationType = watch('evacuation.type');

    const error = formState.errors.evacuation?.clinic?.message;

    const updateEvacuationType = (value: EvacuationType) => () => {
        setValue(`evacuation.type`, value)
    }
    const getEvacuationFieldBg = (value: EvacuationType) => value === evacuationType ? 'primary.main' : 'background.paper';

    return (
        <Box>
            <Box sx={evacuationTypeWrapperStyles}>
                <Box 
                    sx={{ cursor: 'pointer', bgcolor: getEvacuationFieldBg(EvacuationType.LAY) }}
                    onClick={updateEvacuationType(EvacuationType.LAY)}
                >
                    <EvacuationLayIcon />
                    <Typography>
                        лежачи
                    </Typography>
                </Box>
                <Box
                    sx={{ cursor: 'pointer', bgcolor: getEvacuationFieldBg(EvacuationType.SIT) }}
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

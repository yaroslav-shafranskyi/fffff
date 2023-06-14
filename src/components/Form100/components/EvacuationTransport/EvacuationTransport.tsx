import { useFormContext } from "react-hook-form";
import { Box } from '@mui/material';

import { EvacuationTransport, IForm100 } from "../../../../api";
import { evacuationTransportFields } from "../../../../constants";

import { evacuationTransportCellStyles, evacuationTransportWrapperStyles } from "./styles";

export const EvacuationTransportComponent = () => {
    const { watch, setValue } = useFormContext<IForm100>();

    const transport = watch('evacuation.transport');

    const updateTransport = (value: EvacuationTransport) => () => {
        setValue('evacuation.transport', value)
    }
    const getEvacuationFieldBg = (value: EvacuationTransport) => value === transport ? 'primary.main' : 'background.paper';

    return (
        <Box sx={evacuationTransportWrapperStyles}>
            {Object.keys(evacuationTransportFields).slice().map(key => 
                <Box 
                    key={key}
                    sx={evacuationTransportCellStyles}
                    onClick={updateTransport(evacuationTransportFields[+key].name)}
                    bgcolor={getEvacuationFieldBg(evacuationTransportFields[+key].name)}
                >
                    {evacuationTransportFields[+key].icon}
                </Box>)}
        </Box>
    );
};

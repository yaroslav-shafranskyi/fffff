import { FC, useCallback } from 'react';
import { useFormContext } from "react-hook-form";
import { Box } from '@mui/material';

import { EvacuationTransport, IForm100 } from "../../../../api";
import { evacuationTransportFields } from "../../../../constants";
import { IFCPropsWithReadonly } from "../../../../interfaces";

import { getEvacuationTransportCellStyles, evacuationTransportWrapperStyles } from "./styles";

export const EvacuationTransportComponent: FC<IFCPropsWithReadonly> = ({ readonly }) => {
    const { watch, setValue } = useFormContext<IForm100>();

    const transport = watch('evacuation.transport');

    const updateTransport = useCallback((value: EvacuationTransport) => () => {
        if (readonly) {
            return;
        }
        setValue('evacuation.transport', value);
    }, [readonly, setValue]);
    
    const getEvacuationFieldBg = (value: EvacuationTransport) => value === transport ? 'success.light' : 'background.paper';

    return (
        <Box sx={evacuationTransportWrapperStyles}>
            {Object.keys(evacuationTransportFields).slice().map(key => 
                <Box 
                    key={key}
                    sx={getEvacuationTransportCellStyles(readonly)}
                    onClick={updateTransport(evacuationTransportFields[+key].name)}
                    bgcolor={getEvacuationFieldBg(evacuationTransportFields[+key].name)}
                >
                    {evacuationTransportFields[+key].icon}
                </Box>)}
        </Box>
    );
};

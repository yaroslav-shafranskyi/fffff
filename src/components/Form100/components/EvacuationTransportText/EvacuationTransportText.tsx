import { FC, useCallback, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import { EvacuationTransport, IForm100 } from '../../../../api';

import { cursorPointerStyles, displayFlexStyles } from '../../styles';

import { evacuationTransportOptionsRowWrapperStyles, evacuationTransportWrapperStyles } from './styles';
import { IEvacuationTransportText } from './types';

export const EvacuationTransportText: FC<IEvacuationTransportText> = ({ readonly }) => {
    const { watch, setValue } = useFormContext<IForm100>();

    const selected = watch('evacuation.transport');

    const updateSelected = useCallback((transport?: EvacuationTransport) => () => {
        if (readonly) {
            return;
        }
        const newSelected = transport === selected ? undefined : transport;
        setValue('evacuation.transport', newSelected as EvacuationTransport);      
    }, [readonly, selected, setValue]);

    const getOptionColor = (option: EvacuationTransport) => option === selected ? 'primary' : 'textPrimary';

    const optionsWrapperSx = useMemo(() => readonly ? {} : cursorPointerStyles, [readonly]);

    return (
        <Box sx={evacuationTransportWrapperStyles}>
            <Typography>
                Евакуйований
            </Typography>
            <Box sx={evacuationTransportOptionsRowWrapperStyles}>
                <Box sx={displayFlexStyles}>
                    <Box sx={optionsWrapperSx} onClick={updateSelected(EvacuationTransport.SANITARY)}>
                        <Typography color={getOptionColor(EvacuationTransport.SANITARY)}>
                            {EvacuationTransport.SANITARY}
                        </Typography>
                    </Box>
                    <Typography>{`, `}</Typography>
                </Box>
                <Box sx={displayFlexStyles}>
                    <Box sx={optionsWrapperSx} onClick={updateSelected(EvacuationTransport.TRUCK)}>
                        <Typography color={getOptionColor(EvacuationTransport.TRUCK)}>
                            {EvacuationTransport.TRUCK}
                        </Typography>
                    </Box>
                    <Typography>{`, `}</Typography>
                </Box>
                <Box sx={displayFlexStyles}>
                    <Box sx={optionsWrapperSx} onClick={updateSelected(EvacuationTransport.CAR)}>
                        <Typography color={getOptionColor(EvacuationTransport.CAR)}>
                            {EvacuationTransport.CAR}
                        </Typography>
                    </Box>
                    <Typography>{`, `}</Typography>
                </Box>
            </Box>
            <Box sx={evacuationTransportOptionsRowWrapperStyles}>
                <Box sx={displayFlexStyles}>
                    <Box sx={optionsWrapperSx} onClick={updateSelected(EvacuationTransport.TRAIN)}>
                        <Typography color={getOptionColor(EvacuationTransport.TRAIN)}>
                            {EvacuationTransport.TRAIN}
                        </Typography>
                    </Box>
                    <Typography>{`, `}</Typography>
                </Box>
                <Box sx={displayFlexStyles}>
                    <Box sx={optionsWrapperSx} onClick={updateSelected(EvacuationTransport.SHIP)}>
                        <Typography color={getOptionColor(EvacuationTransport.SHIP)}>
                            {EvacuationTransport.SHIP}
                        </Typography>
                    </Box>
                    <Typography>{`, `}</Typography>
                </Box>
            </Box>
            <Box sx={evacuationTransportOptionsRowWrapperStyles}>
                <Box sx={displayFlexStyles}>
                    <Box sx={optionsWrapperSx} onClick={updateSelected(EvacuationTransport.HELICOPTER)}>
                        <Typography color={getOptionColor(EvacuationTransport.HELICOPTER)}>
                            {EvacuationTransport.HELICOPTER}
                        </Typography>
                    </Box>
                    <Typography>{`, `}</Typography>
                </Box>
            </Box>
            <Box sx={optionsWrapperSx} onClick={updateSelected(EvacuationTransport.PLANE)}>
                <Typography color={getOptionColor(EvacuationTransport.PLANE)}>
                    {EvacuationTransport.PLANE}
                </Typography>
            </Box>
        </Box>
    )
};

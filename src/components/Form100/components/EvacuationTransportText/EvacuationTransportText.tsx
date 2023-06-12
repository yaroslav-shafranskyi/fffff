import { FC, useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

import { EvacuationTransport } from '../../../../api';

import { cursorPointerStyles, displayFlexStyles } from '../../styles';

import { IEvacuationTransportTextProps } from './types';
import { evacuationTransportOptionsRowWrapperStyles, evacuationTransportWrapperStyles } from './styles';

export const EvacuationTransportText: FC<IEvacuationTransportTextProps> = (props) => {
    const { data, onChange } = props;

    const [selected, setSelected] = useState<EvacuationTransport>();

    useEffect(() => {
        setSelected(data);
    }, [data]);

    const updateSelected = (transport?: EvacuationTransport) => () => {
        const newSelected = transport === selected ? undefined : transport;
        setSelected(newSelected);
        onChange?.(newSelected);      
    };

    const getOptionColor = (option: EvacuationTransport) => option === selected ? 'primary' : 'textPrimary';

    return (
        <Box sx={evacuationTransportWrapperStyles}>
            <Typography>
                Евакуйований
            </Typography>
            <Box sx={evacuationTransportOptionsRowWrapperStyles}>
                <Box sx={displayFlexStyles}>
                    <Box sx={cursorPointerStyles} onClick={updateSelected(EvacuationTransport.SANITARY)}>
                        <Typography color={getOptionColor(EvacuationTransport.SANITARY)}>
                            {EvacuationTransport.SANITARY}
                        </Typography>
                    </Box>
                    <Typography>{`, `}</Typography>
                </Box>
                <Box sx={displayFlexStyles}>
                    <Box sx={cursorPointerStyles} onClick={updateSelected(EvacuationTransport.TRUCK)}>
                        <Typography color={getOptionColor(EvacuationTransport.TRUCK)}>
                            {EvacuationTransport.TRUCK}
                        </Typography>
                    </Box>
                    <Typography>{`, `}</Typography>
                </Box>
                <Box sx={displayFlexStyles}>
                    <Box sx={cursorPointerStyles} onClick={updateSelected(EvacuationTransport.CAR)}>
                        <Typography color={getOptionColor(EvacuationTransport.CAR)}>
                            {EvacuationTransport.CAR}
                        </Typography>
                    </Box>
                    <Typography>{`, `}</Typography>
                </Box>
            </Box>
            <Box sx={evacuationTransportOptionsRowWrapperStyles}>
                <Box sx={displayFlexStyles}>
                    <Box sx={cursorPointerStyles} onClick={updateSelected(EvacuationTransport.TRAIN)}>
                        <Typography color={getOptionColor(EvacuationTransport.TRAIN)}>
                            {EvacuationTransport.TRAIN}
                        </Typography>
                    </Box>
                    <Typography>{`, `}</Typography>
                </Box>
                <Box sx={displayFlexStyles}>
                    <Box sx={cursorPointerStyles} onClick={updateSelected(EvacuationTransport.SHIP)}>
                        <Typography color={getOptionColor(EvacuationTransport.SHIP)}>
                            {EvacuationTransport.SHIP}
                        </Typography>
                    </Box>
                    <Typography>{`, `}</Typography>
                </Box>
            </Box>
            <Box sx={evacuationTransportOptionsRowWrapperStyles}>
                <Box sx={displayFlexStyles}>
                    <Box sx={cursorPointerStyles} onClick={updateSelected(EvacuationTransport.HELICOPTER)}>
                        <Typography color={getOptionColor(EvacuationTransport.HELICOPTER)}>
                            {EvacuationTransport.HELICOPTER}
                        </Typography>
                    </Box>
                    <Typography>{`, `}</Typography>
                </Box>
            </Box>
            <Box sx={cursorPointerStyles} onClick={updateSelected(EvacuationTransport.PLANE)}>
                <Typography color={getOptionColor(EvacuationTransport.PLANE)}>
                    {EvacuationTransport.PLANE}
                </Typography>
            </Box>
        </Box>
    )
};

import { FC, Fragment, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

import { EvacuationClinic } from '../../../../api';
import { evacuationClinicFieldNames } from '../../../../constants';

import { IEvacuationClinicProps } from './types';
import { evacuationClinicTitleWrapperStyles, evacuationClinicStyles, evacuationClinicOptionsWrapperStyles } from './styles';

export const EvacuationClinicComponent: FC<IEvacuationClinicProps> = (props) => {
    const { data } = props;

    const [selected, setSelected] = useState<EvacuationClinic>();

    useEffect(() => {
        setSelected(data);
    }, [data]);

    const getClinicBgColor = (option: EvacuationClinic) => option === selected ? 'primary.main' : 'background.paper';

    const updateClinic = (clinic: EvacuationClinic) => () => {
        if (clinic === selected) {
            setSelected(undefined);
            return;
        }
        setSelected(clinic);
    }

    return (
        <>
            <Box sx={evacuationClinicTitleWrapperStyles}>
                <Typography>
                    куди евакуйований
                </Typography>
            </Box>
            <Box sx={evacuationClinicOptionsWrapperStyles}>
                {Object.keys(evacuationClinicFieldNames).slice().sort().map(key => <Fragment key={key}>
                        <Box 
                            sx={evacuationClinicStyles}
                            bgcolor={getClinicBgColor(evacuationClinicFieldNames[+key].name as EvacuationClinic)}
                            onClick={updateClinic(evacuationClinicFieldNames[+key].name as EvacuationClinic)}
                        >
                            <Typography>
                                {evacuationClinicFieldNames[+key].name as EvacuationClinic}
                            </Typography>
                        </Box>
                    </Fragment>
                )}
            </Box>
        </>
    )
};

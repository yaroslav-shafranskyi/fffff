import { Fragment } from 'react';
import { Box, Typography } from '@mui/material';

import { EvacuationClinic, IForm100 } from '../../../../api';
import { evacuationClinicFieldNames } from '../../../../constants';

import { evacuationClinicTitleWrapperStyles, evacuationClinicStyles, evacuationClinicOptionsWrapperStyles } from './styles';
import { useFormContext } from 'react-hook-form';

export const EvacuationClinicComponent = () => {
    const { watch, setValue, clearErrors } = useFormContext<IForm100>();

    const selected = watch('evacuation.clinic');

    const getClinicBgColor = (option: EvacuationClinic) => option === selected ? 'primary.main' : 'background.paper';

    const updateClinic = (clinic: EvacuationClinic) => () => {
        clearErrors('evacuation.clinic');
        if (clinic === selected) {
            setValue('evacuation.clinic', undefined as unknown as EvacuationClinic);
            return;
        }
        setValue('evacuation.clinic', clinic);
    };

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

import { FC, Fragment, useCallback } from 'react';
import { Box, Typography } from '@mui/material';

import { EvacuationClinic, IForm100 } from '../../../../api';
import { evacuationClinicFieldNames } from '../../../../constants';
import { IFCPropsWithReadonly } from '../../../../interfaces';

import { evacuationClinicTitleWrapperStyles, evacuationClinicOptionsWrapperStyles, getEvacuationClinicStyles } from './styles';
import { useFormContext } from 'react-hook-form';

export const EvacuationClinicComponent: FC<IFCPropsWithReadonly> = ({ readonly }) => {
    const { watch, setValue, clearErrors } = useFormContext<IForm100>();

    const selected = watch('evacuation.clinic');

    const getClinicBgColor = (option: EvacuationClinic) => option === selected ? 'success.light' : 'background.paper';

    const updateClinic = useCallback((clinic: EvacuationClinic) => () => {
        if (readonly) {
            return;
        }
        clearErrors('evacuation.clinic');
        if (clinic === selected) {
            setValue('evacuation.clinic', undefined as unknown as EvacuationClinic);
            return;
        }
        setValue('evacuation.clinic', clinic);
    }, [clearErrors, readonly, selected, setValue]);

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
                            sx={getEvacuationClinicStyles(readonly)}
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

import { FC, Fragment, useCallback, useMemo } from 'react';
import { Box, Typography } from '@mui/material';

import { EvacuationClinic, IForm100 } from '../../../../api';
import { IFCPropsWithReadonly } from '../../../../interfaces';

import { evacuationClinicTitleWrapperStyles, evacuationClinicOptionsWrapperStyles, getEvacuationClinicStyles } from './styles';
import { useFormContext } from 'react-hook-form';

const allClinics = Object.values(EvacuationClinic);

export const EvacuationClinicComponent: FC<IFCPropsWithReadonly> = ({ readonly }) => {
    const { watch, setValue, clearErrors } = useFormContext<IForm100>();

    const selected = watch('evacuation.clinic');

    const { selectedNames, selectedOrders } = useMemo(() =>
        selected.reduce((acc: { selectedNames: EvacuationClinic[]; selectedOrders: number[]; }, cur) => {
                acc.selectedNames.push(cur.clinic);
                acc.selectedOrders.push(cur.order);
                return acc;
            }, { selectedNames: [], selectedOrders: [] }),
        [selected]);
    
    const maxOrder = useMemo(() => !selectedOrders.length ? -1 : Math.max(...selectedOrders), [selectedOrders]);

    const checkIfSelected = useCallback((option: EvacuationClinic) => selectedNames.includes(option), [selectedNames]);

    const restClinics = useMemo(() => allClinics.filter(clinic => !checkIfSelected(clinic)), [checkIfSelected]);

    const getClinicBgColor = (option: EvacuationClinic) => checkIfSelected(option) ? 'success.light' : 'background.paper';

    const unSelectClinic = useCallback((clinic: EvacuationClinic) => {
        const newClinics = selected
                .filter(({ clinic: selectedClinic }) => selectedClinic !== clinic)
                .map((c, i) => ({ order: i, clinic: c.clinic}));
            setValue('evacuation.clinic', newClinics);
    }, [selected, setValue])

    const updateClinic = useCallback((clinic: EvacuationClinic) => () => {
        if (readonly) {
            return;
        }
        clearErrors('evacuation.clinic');
        const isSelected = checkIfSelected(clinic);
        if (isSelected) {
            unSelectClinic(clinic);
            return;
        }
        setValue('evacuation.clinic', [...selected, { order: maxOrder + 1, clinic}]);
    }, [checkIfSelected, clearErrors, maxOrder, readonly, selected, setValue, unSelectClinic]);

    const getStylesOrder = useCallback((clinic: EvacuationClinic) => {
        if (!checkIfSelected(clinic)) {
            return false
        }
        const order = selected.find(({ clinic: selectedClinic }) => selectedClinic === clinic)?.order;
        return !!order;
    }, [checkIfSelected, selected]);

    return (
        <>
            <Box sx={evacuationClinicTitleWrapperStyles}>
                <Typography>
                    куди евакуйований
                </Typography>
            </Box>
            <Box sx={evacuationClinicOptionsWrapperStyles}>
                {[...selectedNames, ...restClinics].map(clinic => <Fragment key={clinic}>
                        <Box 
                            sx={getEvacuationClinicStyles(getStylesOrder(clinic), readonly)}
                            bgcolor={getClinicBgColor(clinic)}
                            onClick={updateClinic(clinic)}
                        >
                            <Typography>
                                {clinic}
                            </Typography>
                        </Box>
                    </Fragment>
                )}
            </Box>
        </>
    );
};

import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { EvacuationTransport } from '../../../../api';

import { sectionStyles, cursorPointerStyles, displayFlexStyles } from '../../styles';
import { MedicalHelp } from '../MedicalHelp';
import { Injury } from '../Injury';
import { Diagnosis } from '../Diagnosis';
import { PersonInfo } from '../PersonInfo';
import { Form100Date } from '../Date';
import { EvacuationClinicComponent } from '../EvacuationClinic';

import { 
    titleStyles,
    titleWrapperStyles, 
    evacuationWrapperStyles,
    evacuationTransportWrapperStyles,
    evacuationTransportOptionsRowWrapperStyles,
    evacuationClinicWrapperStyles,
    evacuationClinicTipWrapperStyles,
    medicalHelpAndInjuryTypeWrapperStyles,
    medicalHelpAndInjutyTypeTipStyles,
} from './styles';
import { ICounterfoilFrontState, ICounterfoilFrontProps } from './types';
import { getDefaultCounterfoilFrontState } from './constants';

export const CounterfoilFront: FC<ICounterfoilFrontProps> = () => {
    const { getValues, setValue, watch } = useForm<ICounterfoilFrontState>({
        defaultValues: getDefaultCounterfoilFrontState(),
    });

    const values = getValues();

    watch('evacuation.transport');
    watch('evacuation.clinic');
    watch('injury');

    const updateValue = <T extends string>(name: keyof typeof values, value: T) => () => {
        setValue(name, value)
    };
    const getNestedFieldOptionColor = <T extends string>(groupName: keyof typeof values, fieldName: string, option: T) => option === (values[groupName] as Record<string, T>)[fieldName] ? 'primary' : 'textPrimary';

    return <>
        <Box sx={sectionStyles}>
            <Box sx={titleWrapperStyles}>
                <Typography variant='h6' sx={titleStyles}>
                    КОРІНЕЦЬ ПЕРВИННОЇ МЕДИЧНОЇ
                </Typography>
                <Typography variant='h6' sx={titleStyles}>
                    КАРТКИ
                </Typography>
            </Box>
            <Form100Date />
            <PersonInfo />
            <Box sx={evacuationWrapperStyles}>
                <Box sx={evacuationTransportWrapperStyles}>
                    <Typography>
                        Евакуйований
                    </Typography>
                    <Box sx={evacuationTransportOptionsRowWrapperStyles}>
                        <Box sx={displayFlexStyles}>
                            <Box sx={cursorPointerStyles} onClick={updateValue('evacuation.transport' as keyof ICounterfoilFrontState, EvacuationTransport.SANITARY)}>
                                <Typography color={getNestedFieldOptionColor('evacuation', 'transport', EvacuationTransport.SANITARY)}>
                                    {EvacuationTransport.SANITARY}
                                </Typography>
                            </Box>
                            <Typography>{`, `}</Typography>
                        </Box>
                        <Box sx={displayFlexStyles}>
                            <Box sx={cursorPointerStyles} onClick={updateValue('evacuation.transport' as keyof ICounterfoilFrontState, EvacuationTransport.TRUCK)}>
                                <Typography color={getNestedFieldOptionColor('evacuation', 'transport', EvacuationTransport.TRUCK)}>
                                    {EvacuationTransport.TRUCK}
                                </Typography>
                            </Box>
                            <Typography>{`, `}</Typography>
                        </Box>
                        <Box sx={displayFlexStyles}>
                            <Box sx={cursorPointerStyles} onClick={updateValue('evacuation.transport' as keyof ICounterfoilFrontState, EvacuationTransport.CAR)}>
                                <Typography color={getNestedFieldOptionColor('evacuation', 'transport', EvacuationTransport.CAR)}>
                                    {EvacuationTransport.CAR}
                                </Typography>
                            </Box>
                            <Typography>{`, `}</Typography>
                        </Box>
                    </Box>
                    <Box sx={evacuationTransportOptionsRowWrapperStyles}>
                        <Box sx={displayFlexStyles}>
                            <Box sx={cursorPointerStyles} onClick={updateValue('evacuation.transport' as keyof ICounterfoilFrontState, EvacuationTransport.TRAIN)}>
                                <Typography color={getNestedFieldOptionColor('evacuation', 'transport', EvacuationTransport.TRAIN)}>
                                    {EvacuationTransport.TRAIN}
                                </Typography>
                            </Box>
                            <Typography>{`, `}</Typography>
                        </Box>
                        <Box sx={displayFlexStyles}>
                            <Box sx={cursorPointerStyles} onClick={updateValue('evacuation.transport' as keyof ICounterfoilFrontState, EvacuationTransport.SHIP)}>
                                <Typography color={getNestedFieldOptionColor('evacuation', 'transport', EvacuationTransport.SHIP)}>
                                    {EvacuationTransport.SHIP}
                                </Typography>
                            </Box>
                            <Typography>{`, `}</Typography>
                        </Box>
                    </Box>
                    <Box sx={evacuationTransportOptionsRowWrapperStyles}>
                        <Box sx={displayFlexStyles}>
                            <Box sx={cursorPointerStyles} onClick={updateValue('evacuation.transport' as keyof ICounterfoilFrontState, EvacuationTransport.HELICOPTER)}>
                                <Typography color={getNestedFieldOptionColor('evacuation', 'transport', EvacuationTransport.HELICOPTER)}>
                                    {EvacuationTransport.HELICOPTER}
                                </Typography>
                            </Box>
                            <Typography>{`, `}</Typography>
                        </Box>
                    </Box>
                    <Box sx={cursorPointerStyles} onClick={updateValue('evacuation.transport' as keyof ICounterfoilFrontState, EvacuationTransport.PLANE)}>
                        <Typography color={getNestedFieldOptionColor('evacuation', 'transport', EvacuationTransport.PLANE)}>
                            {EvacuationTransport.PLANE}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={evacuationClinicWrapperStyles}>
                    <EvacuationClinicComponent />
                    <Box sx={evacuationClinicTipWrapperStyles}>
                        <Typography>
                            потрібне обвести
                        </Typography>
                    </Box>
                </Box> 
            </Box>
            <Box sx={medicalHelpAndInjuryTypeWrapperStyles}>
                <MedicalHelp />
                <Box sx={medicalHelpAndInjutyTypeTipStyles}>
                    <Typography>
                        Вид санітарних втрат (обвести)
                    </Typography>
                </Box>
                <Injury />
            </Box>
            <Diagnosis />
        </Box>
    </>
};

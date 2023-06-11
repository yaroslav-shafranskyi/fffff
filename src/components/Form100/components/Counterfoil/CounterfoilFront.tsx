import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { getDateData } from '../../../../helpers';
import { EvacuationClinic, EvacuationTransport, RecordType } from '../../../../api';
import { Input } from '../../../../shared';

import { sectionStyles, cursorPointerStyles } from '../../styles';
import { MedicalHelp } from '../MedicalHelp';

import { 
    dateWrapperStyles,
    titleStyles,
    titleWrapperStyles, 
    injuryReasonWrapper,
    dateNumberInputStyles,
    reasonWrapperStyles,
    reasonAndNewRecordDateWrapperStyles,
    evacuationWrapperStyles,
    evacuationTransportWrapperStyles,
    displayFlexStyles,
    evacuationTransportOptionsRowWrapperStyles,
    evacuationClinicWrapperStyles,
    evacuationClinicTitleWrapperStyles,
    evacuationClinicTipWrapperStyles,
    evacuationClinicOptionsWrapperStyles,
    evacuationClinicStyles,
    medicalHelpAndInjuryTypeWrapperStyles,
    medicalHelpAndInjutyTypeTipStyles,
} from './styles';
import { ICounterfoilFrontState, ICounterfoilFrontProps } from './types';
import { getDefaultCounterfoilFrontState } from './constants';
import { Injury } from '../Injury';
import { Diagnosis } from '../Diagnosis';

export const CounterfoilFront: FC<ICounterfoilFrontProps> = () => {
    const { register, getValues, setValue, watch } = useForm<ICounterfoilFrontState>({
        defaultValues: getDefaultCounterfoilFrontState(),
    });

    const values = getValues();
    const { date } = values;

    const { hours: dateHours, minutes: dateMinutes, day: dateDay, month: dateMonth, year: dateYear } = getDateData(date);

    watch('evacuation.transport');
    watch('evacuation.clinic');
    watch('injury');

    const updateValue = <T extends string>(name: keyof typeof values, value: T) => () => {
        setValue(name, value)
    };
    const getOptionColor = <T extends string>(name: keyof typeof values, option: T) => option === values[name] ? 'primary' : 'textPrimary';
    const getNestedFieldOptionColor = <T extends string>(groupName: keyof typeof values, fieldName: string, option: T) => option === (values[groupName] as Record<string, T>)[fieldName] ? 'primary' : 'textPrimary';

    const getClinicBgColor = (option: EvacuationClinic) => option === values.evacuation.clinic ? 'primary.main' : 'background.paper';

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
            <Box sx={dateWrapperStyles}>
                <Typography>
                    {dateHours} год. {dateMinutes} хв. "{dateDay}" {dateMonth} 20{dateYear}р. 
                </Typography>
            </Box>
            <Box sx={reasonAndNewRecordDateWrapperStyles}>
                <Box sx={reasonWrapperStyles}>
                    <Box sx={injuryReasonWrapper} onClick={updateValue('reason', RecordType.INJURY)}>
                        <Typography color={getOptionColor('reason', RecordType.INJURY)}>Поранений</Typography>
                        <Typography>,</Typography>
                    </Box>
                    <Box sx={cursorPointerStyles} onClick={updateValue('reason', RecordType.SICK)}>
                        <Typography color={getOptionColor('reason', RecordType.SICK)}>захворів</Typography>
                    </Box>
                </Box>
                <Box>
                    <Typography>
                        <Input {...register('newRecordHour')} sx={dateNumberInputStyles} /> год. 
                        <Input { ...register('newRecordHour')} sx={dateNumberInputStyles} /> {`хв. `}
                        <Input { ...register('newRecordDay')} sx={dateNumberInputStyles} />. 
                        <Input { ...register('newRecordMonth')} sx={dateNumberInputStyles} />.
                        20<Input { ...register('newRecordYear')} sx={dateNumberInputStyles} />р. 
                    </Typography>
                </Box>
            </Box>
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
                    <Box sx={evacuationClinicTitleWrapperStyles}>
                        <Typography>
                            куди евакуйований
                        </Typography>
                    </Box>
                    <Box sx={evacuationClinicOptionsWrapperStyles}>
                        <Box 
                            sx={evacuationClinicStyles}
                            bgcolor={getClinicBgColor(EvacuationClinic.MPP)}
                            onClick={updateValue('evacuation.clinic' as keyof ICounterfoilFrontState, EvacuationClinic.MPP)}
                        >
                            <Typography>
                                {EvacuationClinic.MPP}
                            </Typography>
                        </Box>
                        <Box
                            sx={evacuationClinicStyles}
                            bgcolor={getClinicBgColor(EvacuationClinic.VMH)}
                            onClick={updateValue('evacuation.clinic' as keyof ICounterfoilFrontState, EvacuationClinic.VMH)}
                        >
                            <Typography>
                                {EvacuationClinic.VMH}
                            </Typography>
                        </Box>
                        <Box
                            sx={evacuationClinicStyles}
                            bgcolor={getClinicBgColor(EvacuationClinic.VH)}
                            onClick={updateValue('evacuation.clinic' as keyof ICounterfoilFrontState, EvacuationClinic.VH)}
                        >
                            <Typography>
                                {EvacuationClinic.VH}
                            </Typography>
                        </Box>
                        <Box
                            sx={evacuationClinicStyles}
                            bgcolor={getClinicBgColor(EvacuationClinic.VMKC)}
                            onClick={updateValue('evacuation.clinic' as keyof ICounterfoilFrontState, EvacuationClinic.VMKC)}    
                        >
                            <Typography>
                                {EvacuationClinic.VMKC}
                            </Typography>
                        </Box>
                        <Box
                            sx={evacuationClinicStyles}
                            bgcolor={getClinicBgColor(EvacuationClinic.CIVIL)}
                            onClick={updateValue('evacuation.clinic' as keyof ICounterfoilFrontState, EvacuationClinic.CIVIL)}    
                        >
                            <Typography>
                                {EvacuationClinic.CIVIL}
                            </Typography>
                        </Box>
                    </Box>
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

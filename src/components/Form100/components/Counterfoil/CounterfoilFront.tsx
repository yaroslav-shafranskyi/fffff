import { useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import { sectionStyles } from '../../styles';
import { MedicalHelp } from '../MedicalHelp';
import { Injury } from '../Injury';
import { Diagnosis } from '../Diagnosis';
import { PersonInfo } from '../PersonInfo';
import { Form100Date } from '../Date';
import { EvacuationClinicComponent } from '../EvacuationClinic';
import { EvacuationTransportText } from '../EvacuationTransportText';
import { UpdateMedicalHelpType } from '../MedicalHelp/types';


import { 
    titleStyles,
    titleWrapperStyles, 
    evacuationWrapperStyles,
    evacuationClinicWrapperStyles,
    evacuationClinicTipWrapperStyles,
    medicalHelpAndInjuryTypeWrapperStyles,
    medicalHelpAndInjutyTypeTipStyles,
} from './styles';
import { ICounterfoilFrontData } from './types';

export const CounterfoilFront = () => {

    const { setValue, watch } = useFormContext();

    const values = watch();

    const { 
        evacuation,
        date,
        diagnosis,
        medicalHelp,
        injury,
    } = values;

    const updateValue = useCallback(<T,>(field: keyof ICounterfoilFrontData, path?: string) => (value?: T) => {
        if (path) {
            setValue(`${field}.${path}`, value);
        }
        setValue(field, value);
    }, [setValue]);

    const updateMedicalHelp: UpdateMedicalHelpType = useCallback((key, value, path) => {
        updateValue('medicalHelp', `${key}${path ? '.' + path : ''}`)(value);
    }, [updateValue]);

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
            <Form100Date data={date} />
            <PersonInfo />
            <Box sx={evacuationWrapperStyles}>
                <EvacuationTransportText data={evacuation?.transport} onChange={updateValue('evacuation', 'transport')} />
                <Box sx={evacuationClinicWrapperStyles}>
                    <EvacuationClinicComponent data={evacuation?.clinic} onChange={updateValue('evacuation', 'clinic')} />
                    <Box sx={evacuationClinicTipWrapperStyles}>
                        <Typography>
                            потрібне обвести
                        </Typography>
                    </Box>
                </Box> 
            </Box>
            <Box>
            </Box>
            <Box sx={medicalHelpAndInjuryTypeWrapperStyles}>
                <Box>
                    <Typography sx={{ fontWeight: 'bold', ml: .5 }}>
                        МЕДИЧНА ДОПОМОГА
                    </Typography>
                    <MedicalHelp data={medicalHelp} onChange={updateMedicalHelp} />
                </Box>
                <Box sx={medicalHelpAndInjutyTypeTipStyles}>
                    <Typography>
                        Вид санітарних втрат (обвести)
                    </Typography>
                </Box>
                <Injury data={injury} onChange={updateValue('injury')} />
            </Box>
            <Diagnosis data={diagnosis} onChange={updateValue('diagnosis')}  />
        </Box>
    </>
};

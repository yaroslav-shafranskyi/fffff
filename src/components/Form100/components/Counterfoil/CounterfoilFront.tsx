import { FC, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { sectionStyles } from '../../styles';
import { MedicalHelp } from '../MedicalHelp';
import { Injury } from '../Injury';
import { Diagnosis } from '../Diagnosis';
import { PersonInfo, UpdatePersonDataType } from '../PersonInfo';
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
import { ICounterfoilFrontProps, ICounterfoilFrontData } from './types';
import { getDefaultCounterfoilFrontState } from './constants';

export const CounterfoilFront: FC<ICounterfoilFrontProps> = (props) => {
    const { data, onChange } = props;

    const { setValue, watch } = useForm<ICounterfoilFrontData>({
        defaultValues: data ?? getDefaultCounterfoilFrontState(),
    });

    const values = watch();
    const { 
        evacuation,
        date,
        person,
        diagnosis,
        medicalHelp,
        injury,
    } = values;

    const updateValue = useCallback(<T,>(field: keyof ICounterfoilFrontData, path?: string) => (value?: T) => {
        if (path) {
            // @ts-expect-error TODO declare value type correctly
            setValue(`${field}.${path}` as keyof ICounterfoilFrontData, value);
            // @ts-expect-error TODO declare value type correctly
            onChange?.(field, value, path);
            return;
        }
        // @ts-expect-error TODO declare value type correctly
        setValue(field, value);
        // @ts-expect-error TODO declare value type correctly
        onChange?.(field, value)
    }, [setValue, onChange]);

    const updatePerson: UpdatePersonDataType = useCallback((field, value, path) =>  {
        updateValue('person', `${field}${path ? '.' + path : ''}`)(value);
        if (field === 'lastRecord' && path === 'type') {
            updateValue('reason')(value);
        }
    }, [updateValue]);

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
            <PersonInfo data={person} onChange={updatePerson} />
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

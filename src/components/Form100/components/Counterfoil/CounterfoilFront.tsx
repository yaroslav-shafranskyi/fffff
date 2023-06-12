import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { sectionStyles } from '../../styles';
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
    evacuationClinicWrapperStyles,
    evacuationClinicTipWrapperStyles,
    medicalHelpAndInjuryTypeWrapperStyles,
    medicalHelpAndInjutyTypeTipStyles,
} from './styles';
import { ICounterfoilFrontState, ICounterfoilFrontProps } from './types';
import { getDefaultCounterfoilFrontState } from './constants';
import { EvacuationTransportText } from '../EvacuationTransportText';

export const CounterfoilFront: FC<ICounterfoilFrontProps> = (props) => {
    const { data } = props;

    const { getValues, setValue, watch } = useForm<ICounterfoilFrontState>({
        defaultValues: data ?? getDefaultCounterfoilFrontState(),
    });

    const values = getValues();
    const { evacuation, date } = values;

    watch('evacuation.transport');
    watch('evacuation.clinic');
    watch('injury');

    const updateValue = <T extends string>(groupName: keyof ICounterfoilFrontState, fieldName?: string) => (value?: T) => {
        if (fieldName) {
            setValue(`${groupName}.${fieldName}` as keyof ICounterfoilFrontState, value);
            return;
        }
        setValue(groupName, value)
    };

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
                    <EvacuationClinicComponent />
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
                    <MedicalHelp />
                </Box>
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

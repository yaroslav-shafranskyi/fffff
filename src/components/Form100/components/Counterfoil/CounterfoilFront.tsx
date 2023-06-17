import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import { FieldErrorType } from '../../../../interfaces';

import { IForm100FrontState } from '../../types';
import { sectionStyles } from '../../styles';
import { MedicalHelp } from '../MedicalHelp';
import { Injury } from '../Injury';
import { Diagnosis } from '../Diagnosis';
import { PersonInfo } from '../PersonInfo';
import { Form100Date } from '../Date';
import { EvacuationClinicComponent } from '../EvacuationClinic';
import { EvacuationTransportText } from '../EvacuationTransportText';

import { 
    titleStyles,
    titleWrapperStyles, 
    evacuationWrapperStyles,
    evacuationClinicWrapperStyles,
    evacuationClinicTipWrapperStyles,
    medicalHelpAndInjuryTypeWrapperStyles,
    medicalHelpAndInjutyTypeTipStyles,
} from './styles';
import { ICounterfoilFrontProps } from './types';

export const CounterfoilFront: FC<ICounterfoilFrontProps> = ({ readonly }) => {

    const { watch, formState } = useFormContext<IForm100FrontState>();

    const date = watch('date');

    const { errors } = formState;

    const evacuationClinicError = (errors.evacuation as { clinic: FieldErrorType})?.clinic?.message;

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
            <PersonInfo readonly={readonly} />
            <Box sx={evacuationWrapperStyles}>
                <EvacuationTransportText />
                <Box sx={evacuationClinicWrapperStyles}>
                    <EvacuationClinicComponent />
                    <Box sx={evacuationClinicTipWrapperStyles}>
                        <Typography color={evacuationClinicError ? 'error' : 'textPrimary'}>
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

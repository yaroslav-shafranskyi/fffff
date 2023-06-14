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

import { 
    titleStyles,
    titleWrapperStyles, 
    evacuationWrapperStyles,
    evacuationClinicWrapperStyles,
    evacuationClinicTipWrapperStyles,
    medicalHelpAndInjuryTypeWrapperStyles,
    medicalHelpAndInjutyTypeTipStyles,
} from './styles';

export const CounterfoilFront = () => {

    const { watch } = useFormContext();

    const date = watch('date');

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
                <EvacuationTransportText />
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

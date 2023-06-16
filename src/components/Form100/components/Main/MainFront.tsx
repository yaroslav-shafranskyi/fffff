import { Box, Typography } from '@mui/material';

import {
    boldTextStyles,
    displayFlexStyles,
} from '../../styles';
import { PersonInfo } from '../PersonInfo';
import { Injury } from '../Injury';
import { MedicalHelp } from '../MedicalHelp';
import { EvacuationClinicComponent } from '../EvacuationClinic';
import { Diagnosis } from '../Diagnosis';
import { BodyDamage } from '../BodyDamage';
import { Clinic } from '../Clinic';
import { Plait } from '../Plait';
import { SanitaryStatus } from '../SanitaryStatus';
import { EvacuationTypeComponent } from '../EvacuationType';
import { EvacuationPriorityComponent } from '../EvacuationPriority';
import { EvacuationTransportComponent } from '../EvacuationTransport';
import { Signature } from '../Signature';

import {
    centralSectionWraperStyles,
    containerStyles,
    injuryWrapperStyles,
    leftBorderStyles,
    mainSectionStyles,
    mainTitleStyles,
    topBorderStyles,
    signatureWrapperStyles,
    bottomBorderStyles,
    rightBorderStyles,
    evacuationClinicWrapperStyles
} from './styles';

export const MainFront = () => {
    return (
        <Box sx={containerStyles}>
            <Box sx={leftBorderStyles}>
                <Typography variant='h4' sx={boldTextStyles}>
                    ІЗОЛЯЦІЯ
                </Typography>
            </Box>
            <Box sx={centralSectionWraperStyles}>
                <Box sx={topBorderStyles}>
                    <Typography variant='h4' sx={boldTextStyles}>
                        НЕВІДКЛАДНА ДОПОМОГА
                    </Typography>
                </Box>
                <Box sx={mainSectionStyles}>
                    <Box>
                        <Typography sx={mainTitleStyles}>
                            Первинна медична картка
                        </Typography>
                        <Clinic />
                        <PersonInfo />
                        <Box sx={injuryWrapperStyles}>
                            <Injury />
                            <BodyDamage />
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant='subtitle2' sx={mainTitleStyles}>
                            Форма
                        </Typography>
                        <Box>
                            <Typography sx={mainTitleStyles}>
                                МЕДИЧНА ДОПОМОГА
                            </Typography>
                            <Box sx={{ borderLeft: '1px solid' }}>
                                <MedicalHelp />
                            </Box>
                        </Box>
                        <Plait />
                        <Box>
                            <SanitaryStatus />
                            <Box sx={displayFlexStyles}>
                                <EvacuationTypeComponent />
                                <Box sx={evacuationClinicWrapperStyles}>
                                    <EvacuationClinicComponent />
                                </Box>
                            </Box>
                                <EvacuationPriorityComponent />
                                <EvacuationTransportComponent />
                        </Box>
                    </Box>
                </Box>
                    <Diagnosis />
                    <Box sx={signatureWrapperStyles}>
                        <Typography>
                            Лікар
                        </Typography>
                        <Signature />
                    </Box>
                <Box sx={bottomBorderStyles}>
                    <Typography variant='h4'>
                        РАДІАЦІЙНЕ УРАЖЕННЯ
                    </Typography>
                </Box>
            </Box>
            <Box sx={rightBorderStyles}>
                <Typography variant='h4' sx={boldTextStyles}>
                    САНІТАРНА ОБРОБКА
                </Typography>
            </Box>
        </Box>
    )
};

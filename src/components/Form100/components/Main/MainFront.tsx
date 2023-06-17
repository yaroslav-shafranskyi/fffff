import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import { FieldErrorType, IFCPropsWithReadonly } from '../../../../interfaces';

import {
    boldTextStyles,
    displayFlexStyles,
} from '../../styles';
import { IForm100FrontState } from '../../types';

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

export const MainFront: FC<IFCPropsWithReadonly> = ({ readonly }) => {
    const { formState } = useFormContext<IForm100FrontState>(); 
    const { errors } = formState;

    const evacuationClinicError = (errors.evacuation as { clinic?: FieldErrorType })?.clinic?.message;

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
                        <Clinic readonly={readonly} />
                        <PersonInfo readonly={readonly} />
                        <Box sx={injuryWrapperStyles}>
                            <Injury readonly={readonly} />
                            <BodyDamage readonly={readonly} />
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
                                <MedicalHelp readonly={readonly} />
                            </Box>
                        </Box>
                        <Plait />
                        <Box>
                            <SanitaryStatus readonly={readonly} />
                            <Box sx={displayFlexStyles}>
                                <EvacuationTypeComponent readonly={readonly} />
                                <Box sx={evacuationClinicWrapperStyles}>
                                    <EvacuationClinicComponent readonly={readonly} />
                                </Box>
                            </Box>
                                {evacuationClinicError && <Typography sx={{ textAlign: 'center' }} color='error'>
                                        {evacuationClinicError}
                                </Typography>}
                                <EvacuationPriorityComponent readonly={readonly} />
                                <EvacuationTransportComponent readonly={readonly} />
                        </Box>
                    </Box>
                </Box>
                    <Diagnosis readonly={readonly} />
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

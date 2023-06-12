import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { Input } from '../../../../shared';
import { EvacuationLayIcon, EvacuationSitIcon } from '../../../../assets';
import { EvacuationClinic, EvacuationPriority, EvacuationTransport, EvacuationType, IEvacuation, SanitaryTreatmentStatus } from '../../../../api';
import { evacuationTransportFields } from '../../../../constants';

import {
    boldTextStyles,
    cursorPointerStyles,
    dateNumberInputStyles,
    displayFlexStyles,
    severalInlineOptionsWrapperStyles
} from '../../styles';
import { PersonInfo } from '../PersonInfo';
import { Injury } from '../Injury';
import { MedicalHelp } from '../MedicalHelp';
import { EvacuationClinicComponent } from '../EvacuationClinic';
import { Diagnosis } from '../Diagnosis';
import { BodyDamage } from '../BodyDamage';

import { IMainFrontProps } from './types';
import {
    centralSectionWraperStyles,
    clinicCaptionWrapperStyles,
    clinicInputPropsSx,
    clinicInputWrapperStyles,
    clinicWrapperStyles,
    containerStyles,
    injuryWrapperStyles,
    leftBorderStyles,
    mainSectionStyles,
    mainTitleStyles,
    topBorderStyles,
    sanitaryStatusWrapperStyles,
    evacuationTypeWrapperStyles,
    evacuationTypeTipStyles,
    evacuationPriorityWrapperStyles,
    evacuationPriorityOptionsWrapperStyles,
    evacuationTransportWrapperStyles,
    evacuationTransportCellStyles,
    signatureWrapperStyles,
    bottomBorderStyles,
    rightBorderStyles
} from './styles';
import { defaultMainFrontData } from './constants';

export const MainFront: FC<IMainFrontProps> = (props) => {
    const { data } = props;

    const { register, getValues, setValue, watch } = useForm({
        defaultValues: data ?? defaultMainFrontData,
    });

    const values = getValues();
    const {
        bodyDamage,
        bodyImage,
        sanitaryTreatment,
        evacuation
    } = values;

    watch('bodyDamage');
    watch('sanitaryTreatment');
    watch('evacuation');

    const updateSanitaryTreatmentStatus = (type: SanitaryTreatmentStatus) => () => {
        setValue('sanitaryTreatment', type);
    };
    const getSanitaryTreatmentStatusColor = (type: SanitaryTreatmentStatus) => sanitaryTreatment === type ? 'error' : 'textPrimary';

    const updateEvacuation = (field: keyof IEvacuation, value: EvacuationClinic | EvacuationTransport | EvacuationType | EvacuationPriority) => () => {
        setValue(`evacuation.${field}`, value)
    }
    const getEvacuationFieldBg = (field: keyof IEvacuation, value: EvacuationType | EvacuationTransport | EvacuationType | EvacuationPriority) => value === evacuation[field] ? 'primary.main' : 'background.paper';
    const getEvacuationFieldColor = (field: keyof IEvacuation, value: EvacuationType | EvacuationTransport | EvacuationType | EvacuationPriority) => value === evacuation[field] ? 'error' : 'textPrimary';

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
                        <Box sx={clinicWrapperStyles}>
                            <Typography>
                                Видана:
                            </Typography>
                            <Box sx={clinicInputWrapperStyles}>
                                <Input
                                    {...register('clinic')}
                                    fullWidth={true}
                                    multiline={true}
                                    rows={2}
                                    inputProps={{
                                        sx: clinicInputPropsSx,
                                    }}
                                />
                                <Box sx={clinicCaptionWrapperStyles}>
                                    <Typography variant='caption'>
                                        найменування мед. пункту (закладу), або їх штамп
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <PersonInfo />
                        <Box sx={injuryWrapperStyles}>
                            <Injury />
                            <BodyDamage data={{ image: bodyImage, info: bodyDamage ?? [] }} />
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
                        <Box sx={displayFlexStyles}>
                            <Typography sx={boldTextStyles}>
                                Джгут накладений
                            </Typography>
                            <Typography>
                                <Input {...register('plaitHour')} sx={dateNumberInputStyles} /> год. 
                                <Input { ...register('plaitMinute')} sx={dateNumberInputStyles} /> {`хв. `}
                                <Input { ...register('plaitDay')} sx={dateNumberInputStyles} />. 
                                <Input { ...register('plaitMonth')} sx={dateNumberInputStyles} />.
                                20<Input { ...register('plaitYear')} sx={dateNumberInputStyles} />р. 
                            </Typography>
                        </Box>
                        <Box>
                            <Box sx={sanitaryStatusWrapperStyles}>
                                <Typography>
                                    Санітарна обробка (підкреслити)
                                </Typography>
                                <Box sx={severalInlineOptionsWrapperStyles}>
                                    <Box sx={displayFlexStyles}>
                                        <Box sx={cursorPointerStyles} onClick={updateSanitaryTreatmentStatus(SanitaryTreatmentStatus.FULL)}>
                                            <Typography color={getSanitaryTreatmentStatusColor(SanitaryTreatmentStatus.FULL)}>
                                                {SanitaryTreatmentStatus.FULL}
                                            </Typography>
                                        </Box>,
                                    </Box>
                                    <Box sx={displayFlexStyles}>
                                        <Box sx={cursorPointerStyles} onClick={updateSanitaryTreatmentStatus(SanitaryTreatmentStatus.PARTICULAR)}>
                                            <Typography color={getSanitaryTreatmentStatusColor(SanitaryTreatmentStatus.PARTICULAR)}>
                                                {SanitaryTreatmentStatus.PARTICULAR}
                                            </Typography>
                                        </Box>,
                                    </Box>
                                    <Box sx={cursorPointerStyles} onClick={updateSanitaryTreatmentStatus(SanitaryTreatmentStatus.NONE)}>
                                        <Typography color={getSanitaryTreatmentStatusColor(SanitaryTreatmentStatus.NONE)}>
                                            {SanitaryTreatmentStatus.NONE}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Typography>
                                    Евакуйований (потрібне обвести)
                                </Typography>
                            </Box>
                            <Box sx={displayFlexStyles}>
                                <Box sx={evacuationTypeWrapperStyles}>
                                    <Box 
                                        sx={{ cursor: 'pointer', bgcolor: getEvacuationFieldBg('type', EvacuationType.LAY) }}
                                        onClick={updateEvacuation('type', EvacuationType.LAY)}
                                    >
                                        <EvacuationLayIcon />
                                        <Typography sx={evacuationTypeTipStyles}>
                                            лежачи
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{ cursor: 'pointer', bgcolor: getEvacuationFieldBg('type', EvacuationType.SIT) }}
                                        onClick={updateEvacuation('type', EvacuationType.SIT)}
                                    >
                                        <EvacuationSitIcon />
                                        <Typography sx={evacuationTypeTipStyles}>
                                            сидячи
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ border: '1.5px solid', borderRight: 'none' }}>
                                    <EvacuationClinicComponent />
                                </Box>
                            </Box>
                                <Box sx={evacuationPriorityWrapperStyles}>
                                    <Typography>
                                        Черговість евакуації:
                                    </Typography>
                                    <Box sx={evacuationPriorityOptionsWrapperStyles}>
                                        <Box sx={displayFlexStyles}>
                                            <Box sx={cursorPointerStyles} onClick={updateEvacuation('priority', 'I')}>
                                                <Typography color={getEvacuationFieldColor('priority', 'I')}>
                                                    I
                                                </Typography>
                                            </Box>{', '}
                                        </Box>
                                        <Box sx={displayFlexStyles}>
                                            <Box sx={cursorPointerStyles} onClick={updateEvacuation('priority', 'II')}>
                                                <Typography color={getEvacuationFieldColor('priority', 'II')}>
                                                    II
                                                </Typography>
                                            </Box>{', '}
                                        </Box>
                                        <Box sx={cursorPointerStyles} onClick={updateEvacuation('priority', 'III')}>
                                            <Typography color={getEvacuationFieldColor('priority', 'III')}>
                                                III
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={evacuationTransportWrapperStyles}>
                                    {Object.keys(evacuationTransportFields).slice().map(key => 
                                        <Box 
                                            key={key}
                                            sx={evacuationTransportCellStyles}
                                            onClick={updateEvacuation('transport', evacuationTransportFields[+key].name)}
                                            bgcolor={getEvacuationFieldBg('transport', evacuationTransportFields[+key].name)}
                                        >
                                            {evacuationTransportFields[+key].icon}
                                        </Box>)}
                                </Box>
                        </Box>
                    </Box>
                </Box>
                    <Diagnosis />
                    <Box sx={signatureWrapperStyles}>
                        <Typography>
                            Лікар
                        </Typography>
                        <Box sx={{ textAlign: 'center' }}>
                            <Input fullWidth={true} />
                            <Typography variant='caption'>
                                підпис (розбірливо)
                            </Typography>
                        </Box>
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

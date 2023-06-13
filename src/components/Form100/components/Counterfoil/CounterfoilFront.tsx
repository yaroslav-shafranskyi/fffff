import { FC, useCallback, useEffect } from 'react';
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
        reason, 
    } = values;

    const {
        id,
        firstName,
        secondName,
        lastName,
        tokenNumber,
        rank,
        militaryBase,
        gender,
        lastRecord,
    } = person;

    const { type: lastRecordType, date: lastRecordDate } = lastRecord ?? {};

    useEffect(() => {
        onChange?.('person', id, 'id')
    }, [id, onChange]);

    useEffect(() => {
        onChange?.('person', firstName, 'firstName')
    }, [firstName, onChange]);

    useEffect(() => {
        onChange?.('person', secondName, 'secondName')
    }, [secondName, onChange]);

    useEffect(() => {
        onChange?.('person', lastName, 'lastName')
    }, [lastName, onChange]);

    useEffect(() => {
        onChange?.('person', tokenNumber, 'tokenNumber')
    }, [tokenNumber, onChange]);

    useEffect(() => {
        onChange?.('person', rank, 'rank')
    }, [rank, onChange]);

    useEffect(() => {
        onChange?.('person', militaryBase, 'militaryBase')
    }, [militaryBase, onChange]);

    useEffect(() => {
        onChange?.('person', gender, 'gender')
    }, [gender, onChange]);
    
    useEffect(() => {
        onChange?.('person', lastRecordType, 'lastRecord.type')
    }, [lastRecordType, onChange]);

    useEffect(() => {
        onChange?.('person', lastRecordDate, 'lastRecord.date')
    }, [lastRecordDate, onChange]);

    console.log({ counterfoil: values });

    const updatePerson: UpdatePersonDataType = useCallback((field, value, path) =>  {
        if (path) {
            setValue(`person.${field}.${path}` as keyof ICounterfoilFrontData, value)
            return;
        }
        setValue(`person.${field}`, value);
    }, [setValue]);

    // const updateValue = <T extends string>(groupName: keyof ICounterfoilFrontState, fieldName?: string) => (value?: T) => {
    //     if (fieldName) {
    //         setValue(`${groupName}.${fieldName}` as keyof ICounterfoilFrontState, value);
    //         return;
    //     }
    //     setValue(groupName, value)
    // };

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
                {/* <EvacuationTransportText data={evacuation?.transport} onChange={updateValue('evacuation', 'transport')} /> */}
                <EvacuationTransportText data={evacuation?.transport} />
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

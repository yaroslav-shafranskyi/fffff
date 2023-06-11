import { FC } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { getDateData } from '../../../../helpers';
import { ArmyRank, EvacuationClinic, EvacuationTransport, Gender, IInjury, IMedicalOperations, RecordType } from '../../../../api';
import { Select, Input } from '../../../../shared';

import { iconStyles, sectionStyles } from '../../styles';

import { 
    columnStyles,
    cursorPointerStyles,
    dateWrapperStyles,
    fieldNameStyles,
    fullNameTitleStyles,
    fullWidthInputStyles,
    rowStyles,
    singleElementRowStyles,
    severalFieldsRowStyles,
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
    medicalHelpWrapperStyles,
    medicalHelpAndInjutyTypeTipStyles,
    injuryTypeWrapperStyles,
    medicalPreparationsWrapperStyles,
    preparationGroupWrapperStyles,
    preparationCellWrapperStyles,
    preparationGroupTitleStyles,
    dozeInputStyles,
    operationCellWrapperStyles,
    twoOperationsCellWrapperStyles,
    injuryTypeCellStyles,
    injuryTypeTitleCellStyles,
    diagnosisStyles,
} from './styles';
import { ICounterfoilFrontState, ICounterfoilFrontProps } from './types';
import { getDefaultCounterfoilFrontState } from './constants';
import { injuriesFields } from '../../../../constants';

export const CounterfoilFront: FC<ICounterfoilFrontProps> = () => {
    const { register, getValues, setValue, watch } = useForm<ICounterfoilFrontState>({
        defaultValues: getDefaultCounterfoilFrontState(),
    });

    const values = getValues();
    const { date, medicalHelp, injury } = values;

    const { operations } = medicalHelp;

    const { hours: dateHours, minutes: dateMinutes, day: dateDay, month: dateMonth, year: dateYear } = getDateData(date);

    watch('gender');
    watch('reason');
    watch('evacuation.transport');
    watch('evacuation.clinic');
    watch('medicalHelp.operations');
    watch('injury');

    const updateValue = <T extends string>(name: keyof typeof values, value: T) => () => {
        setValue(name, value)
    };
    const getOptionColor = <T extends string>(name: keyof typeof values, option: T) => option === values[name] ? 'primary' : 'textPrimary';
    const getNestedFieldOptionColor = <T extends string>(groupName: keyof typeof values, fieldName: string, option: T) => option === (values[groupName] as Record<string, T>)[fieldName] ? 'primary' : 'textPrimary';

    const getClinicBgColor = (option: EvacuationClinic) => option === values.evacuation.clinic ? 'primary.main' : 'background.paper';

    const updateOperation = (operation: keyof IMedicalOperations) => () => {
        if (typeof operations?.[operation] === 'string') {
            return;
        }
        if (!operations) {
            setValue('medicalHelp.operations', { [operation]: true });
            return;
        }
        setValue(`medicalHelp.operations.${operation}`, !operations[operation]);
    };
    const getOperationColor = (operation: keyof IMedicalOperations) => operations?.[operation] ? 'primary' : 'textPrimary';

    const updateInjury = (injuryType: keyof IInjury) => () => {
        if (!injury) {
            setValue('injury', { [injuryType]: true });
            return;
        }
        setValue(`injury.${injuryType}`, !injury[injuryType]);
    }
    const getInjuryColor = (injuryType: keyof IInjury) => injury?.[injuryType] ? 'primary.main' : 'background.paper';

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
            <Box sx={rowStyles}>
                <Box sx={columnStyles}>
                    <Box sx={fieldNameStyles}>
                        <Typography>в/звання</Typography>
                    </Box>
                    <Select { ...register('rank')} options={Object.values(ArmyRank)} />
                </Box>
                <Box sx={columnStyles}>
                    <Box>
                        <Typography>в/ч</Typography>
                        <Typography>з’єднання</Typography>
                    </Box>
                    <Input {...register('militaryBase')} />
                </Box>
            </Box>
            <Box sx={singleElementRowStyles}>
                <Input {...register('personFullName')} sx={fullWidthInputStyles} />
                <Box sx={fullNameTitleStyles}>
                    <Typography>
                        прізвище
                    </Typography>
                    <Typography>
                        ім’я
                    </Typography>
                    <Typography>
                        по батькові
                    </Typography>
                </Box>
            </Box>
            <Box sx={severalFieldsRowStyles}>
                <Box sx={fieldNameStyles}>
                    <Typography>Посвідчення особи</Typography>
                </Box>
                <Input {...register('id')} sx={fullWidthInputStyles} />
            </Box>
            <Box sx={severalFieldsRowStyles}>
                <Box sx={fieldNameStyles}>
                    <Typography>Особистий №</Typography>
                </Box>
                <Input {...register('tokenNumber')} sx={fullWidthInputStyles} />
                <Typography>Стать: </Typography>
                <Box sx={cursorPointerStyles} onClick={updateValue('gender', Gender.MALE)}>
                    <Typography color={getOptionColor('gender', Gender.MALE)}>{Gender.MALE}</Typography> 
                </Box>
                <Box sx={cursorPointerStyles} onClick={updateValue('gender', Gender.FEMALE)}>
                    <Typography color={getOptionColor('gender', Gender.FEMALE)}>{Gender.FEMALE}</Typography> 
                </Box>
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
                <Box>
                    <Typography sx={{ fontWeight: 'bold', ml: .5 }}>
                        МЕДИЧНА ДОПОМОГА
                    </Typography>
                    <Box sx={medicalHelpWrapperStyles}>
                        <Box sx={medicalPreparationsWrapperStyles}>
                            <Box sx={preparationGroupWrapperStyles}>
                                <Box sx={preparationGroupTitleStyles}>
                                    <Typography>
                                        Введено
                                    </Typography>
                                    <Typography>
                                        (підкреслити)
                                    </Typography>
                                </Box>
                                <Box sx={preparationCellWrapperStyles}>
                                    <Typography>
                                        Антибіотик
                                    </Typography>
                                </Box>
                                <Box sx={preparationCellWrapperStyles}>
                                    <Typography>
                                        Сироватка ППС, ПГС
                                    </Typography>
                                </Box>
                                <Box sx={preparationCellWrapperStyles}>
                                    <Typography>
                                        Анатоксин (який)
                                    </Typography>
                                </Box>
                                <Box sx={preparationCellWrapperStyles}>
                                    <Typography>
                                        Антидот (який)
                                    </Typography>
                                </Box>
                                <Box sx={preparationCellWrapperStyles}>
                                    <Typography>
                                        Знебол. засіб
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={preparationGroupWrapperStyles}>
                                <Box sx={preparationGroupTitleStyles}>
                                    <Typography>
                                        Доза
                                    </Typography>
                                    <Typography>
                                        (вписати)
                                    </Typography>
                                </Box>
                                <Box sx={preparationCellWrapperStyles}>
                                    <Input {...register('medicalHelp.treatments.antibiotic')} sx={dozeInputStyles} />
                                </Box>
                                <Box sx={preparationCellWrapperStyles}>
                                    <Input {...register('medicalHelp.treatments.serum')} sx={dozeInputStyles} />
                                </Box>
                                <Box sx={preparationCellWrapperStyles}>
                                    <Input {...register('medicalHelp.treatments.toxoid')} sx={dozeInputStyles} />
                                </Box>
                                <Box sx={preparationCellWrapperStyles}>
                                    <Input {...register('medicalHelp.treatments.antidote')} sx={dozeInputStyles} />
                                </Box>
                                <Box sx={preparationCellWrapperStyles}>
                                    <Input {...register('medicalHelp.treatments.painReliever')} sx={dozeInputStyles} />
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={preparationCellWrapperStyles}>
                            <Typography sx={{ textAlign: 'center' }}>
                                Проведено:
                            </Typography>
                        </Box>
                        <Box sx={operationCellWrapperStyles}>
                            <Box sx={cursorPointerStyles} onClick={updateOperation('bloodTransfusion')}>
                                <Typography color={getOperationColor('bloodTransfusion')}>
                                    Переливання крові
                                </Typography>
                            </Box>
                            <Typography>,</Typography>
                        </Box>
                        <Box sx={operationCellWrapperStyles}>
                            <Box sx={cursorPointerStyles} onClick={updateOperation('bloodSubstitute')}>
                                <Typography color={getOperationColor('bloodSubstitute')}>
                                    кровозамінників
                                </Typography>
                            </Box>
                            <Typography>,</Typography>
                        </Box>
                        <Box sx={twoOperationsCellWrapperStyles}>
                            <Box sx={{ display: 'flex' }}>
                                <Box sx={cursorPointerStyles} onClick={updateOperation('immobilization')}>
                                    <Typography color={getOperationColor('immobilization')}>
                                        іммобілізація
                                    </Typography>
                                </Box>
                                <Typography>,</Typography>
                            </Box>
                            <Box sx={{ display: 'flex' }}>
                                <Box sx={cursorPointerStyles} onClick={updateOperation('dressing')}>
                                    <Typography color={getOperationColor('dressing')}>
                                        {`перев’язка`}
                                    </Typography>
                                </Box>
                                <Typography>,</Typography>
                            </Box>
                        </Box>
                        <Box sx={twoOperationsCellWrapperStyles}>
                            <Box sx={{ display: 'flex' }}>
                                <Box sx={cursorPointerStyles} onClick={updateOperation('bandage')}>
                                    <Typography color={getOperationColor('bandage')}>
                                        накладений джгут
                                    </Typography>
                                </Box>
                                <Typography>,</Typography>
                            </Box>
                            <Box sx={cursorPointerStyles} onClick={updateOperation('sanitary')}>
                                <Typography color={getOperationColor('sanitary')}>
                                    санобробка
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={preparationCellWrapperStyles}>
                            <Input 
                                multiline={true} 
                                {...register('medicalHelp.operations.additionalInfo')}
                                sx={{ width: '100%', bottom: '-0.5px', p: 0 }}
                            />
                        </Box>
                    </Box>
                </Box>
                <Box sx={medicalHelpAndInjutyTypeTipStyles}>
                    <Typography>
                        Вид санітарних втрат (обвести)
                    </Typography>
                </Box>
                <Box sx={injuryTypeWrapperStyles}>
                    <Box sx={injuryTypeTitleCellStyles}>
                        <Typography sx={{ fontWeight: 'bold', pl: 2 }}>Б</Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>НБ</Typography>
                    </Box>
                    <Box sx={{ border: '1.5px solid', '& :last-child': { borderBottom: 'none' } }}>
                        {Object.keys(injuriesFields).slice().sort().map(key => <Box sx={injuryTypeCellStyles}>
                                <Box>
                                    <Typography key={key}>
                                        {injuriesFields[+key].name}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={cursorPointerStyles}
                                    onClick={updateInjury(`${injuriesFields[+key].fieldName}`)}
                                    bgcolor={getInjuryColor(injuriesFields[+key].fieldName)}
                                >
                                <IconButton sx={iconStyles} size='small'>
                                    {injuriesFields[+key].icon}
                                </IconButton>
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
            <Box sx={diagnosisStyles}>
                <Typography sx={{ position: 'absolute'}}>
                    Діагноз
                </Typography>
                <Input 
                    {...register('diagnosis')}
                    multiline={true}
                    inputProps={{ sx: { p: 0, textIndent: 60 }}}
                    fullWidth={true}
                    sx={{ p: 0, '& :first-child': { p: 0 } }}
                />
            </Box>
        </Box>
    </>
}
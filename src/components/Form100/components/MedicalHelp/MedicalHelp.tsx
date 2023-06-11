import { FC } from 'react';
import { Box, Input, Typography } from "@mui/material";
import { useForm } from 'react-hook-form';

import { IMedicalHelp, IMedicalOperations } from '../../../../api';

import { cursorPointerStyles } from "../../styles";

import {
    dozeInputStyles,
    medicalHelpWrapperStyles,
    operationCellWrapperStyles,
    preparationCellWrapperStyles,
    preparationGroupTitleStyles,
    preparationNamesTitleStyles,
    preparationRowStyles,
    twoOperationsCellWrapperStyles
} from "./styles";
import { IMedicalHelpProps } from './types';
import { treatmentsFields } from '../../../../constants';

export const MedicalHelp: FC<IMedicalHelpProps> = (props) => {
    const { data } = props;

    const { register, watch, getValues, setValue } = useForm<IMedicalHelp>({
        defaultValues: data ?? {}
    });

    const { operations } = getValues();

    watch('operations');

    const updateOperation = (operation: keyof IMedicalOperations) => () => {
        if (typeof operations?.[operation] === 'string') {
            return;
        }
        if (!operations) {
            setValue('operations', { [operation]: true });
            return;
        }
        setValue(`operations.${operation}`, !operations[operation]);
    };

    const getOperationColor = (operation: keyof IMedicalOperations) => operations?.[operation] ? 'primary' : 'textPrimary';

    return (
        <Box>
            <Typography sx={{ fontWeight: 'bold', ml: .5 }}>
                МЕДИЧНА ДОПОМОГА
            </Typography>
            <Box sx={medicalHelpWrapperStyles}>
                <Box>
                    <Box sx={preparationRowStyles}>
                        <Box sx={preparationNamesTitleStyles}>
                            <Typography>
                                Введено
                            </Typography>
                            <Typography>
                                (підкреслити)
                            </Typography>
                        </Box>
                        <Box sx={preparationGroupTitleStyles}>
                            <Typography>
                                Доза
                            </Typography>
                            <Typography>
                                (вписати)
                            </Typography>
                        </Box>
                    </Box>
                    {Object.keys(treatmentsFields).slice().sort().map(key => <Box sx={preparationRowStyles}>
                        <Box sx={{ borderRight: '1.5px solid' }}>
                            <Typography>
                                {treatmentsFields[+key].name}
                            </Typography>
                        </Box>
                        <Box>
                        <Input {...register(`treatments.${treatmentsFields[+key].fieldName}`)} sx={dozeInputStyles} />
                        </Box>
                    </Box>)}
                </Box>
                <Box>
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
                        {...register('operations.additionalInfo')}
                        sx={{ width: '100%', bottom: '-0.5px', p: 0 }}
                    />
                </Box>
            </Box>
        </Box>
    )
};

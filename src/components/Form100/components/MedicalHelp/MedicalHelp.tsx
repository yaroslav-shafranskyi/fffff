import { ChangeEvent, FC, useCallback, useMemo } from 'react';
import { Box, Input, Typography } from "@mui/material";
import { useFormContext } from 'react-hook-form';

import { IForm100, IMedicalOperations, ITreatments } from '../../../../api';

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
import { treatmentsFields } from '../../../../constants';
import { IFCPropsWithReadonly } from '../../../../interfaces';

export const MedicalHelp: FC<IFCPropsWithReadonly> = ({ readonly }) => {
    const { watch, setValue } = useFormContext<IForm100>();

    const { operations, treatments } = watch('medicalHelp') ?? {};

    const updateStringValues = useCallback((field: keyof IMedicalOperations | keyof ITreatments) =>
        (event: ChangeEvent<HTMLInputElement>) => {
            if (readonly) {
                return;
            }
            const key = field === 'additionalInfo' ? 'operations' : 'treatments';
            const value = event.target.value;
            // @ts-expect-error we set only value for single treatment or additional info
            setValue(`medicalHelp.${key}.${field}`, value);
        }, [readonly, setValue]);

    const updateOperation = useCallback((operation: keyof IMedicalOperations) => 
        () => {
            if (readonly || typeof operations?.[operation] === 'string') {
                return;
            }
            setValue(`medicalHelp.operations.${operation}`, !operations?.[operation]);
        }, [readonly, operations, setValue]);

    const getOperationColor = (operation: keyof IMedicalOperations) => operations?.[operation] ? 'error' : 'textPrimary';

    const clickableBoxStyles = useMemo(() => readonly ? {} : cursorPointerStyles, [readonly]); 

    return (
        <Box>
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
                    {Object.keys(treatmentsFields).slice().sort().map(key => <Box sx={preparationRowStyles} key={key}>
                        <Box sx={{ pl: .5, borderRight: '1.5px solid',  }}>
                            <Typography>
                                {treatmentsFields[+key].name}
                            </Typography>
                        </Box>
                        <Box sx={{ pl: .5 }}>
                        <Input
                            value={treatments?.[treatmentsFields[+key]?.fieldName] ?? ''}
                            onChange={updateStringValues(treatmentsFields[+key].fieldName)}
                            sx={dozeInputStyles}
                        />
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
                    <Box sx={clickableBoxStyles} onClick={updateOperation('bloodTransfusion')}>
                        <Typography color={getOperationColor('bloodTransfusion')}>
                            Переливання крові
                        </Typography>
                    </Box>
                    <Typography>,</Typography>
                </Box>
                <Box sx={operationCellWrapperStyles}>
                    <Box sx={clickableBoxStyles} onClick={updateOperation('bloodSubstitute')}>
                        <Typography color={getOperationColor('bloodSubstitute')}>
                            кровозамінників
                        </Typography>
                    </Box>
                    <Typography>,</Typography>
                </Box>
                <Box sx={twoOperationsCellWrapperStyles}>
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={clickableBoxStyles} onClick={updateOperation('immobilization')}>
                            <Typography color={getOperationColor('immobilization')}>
                                іммобілізація
                            </Typography>
                        </Box>
                        <Typography>,</Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={clickableBoxStyles} onClick={updateOperation('dressing')}>
                            <Typography color={getOperationColor('dressing')}>
                                {`перев’язка`}
                            </Typography>
                        </Box>
                        <Typography>,</Typography>
                    </Box>
                </Box>
                <Box sx={twoOperationsCellWrapperStyles}>
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={clickableBoxStyles} onClick={updateOperation('bandage')}>
                            <Typography color={getOperationColor('bandage')}>
                                накладений джгут
                            </Typography>
                        </Box>
                        <Typography>,</Typography>
                    </Box>
                    <Box sx={clickableBoxStyles} onClick={updateOperation('sanitary')}>
                        <Typography color={getOperationColor('sanitary')}>
                            санобробка
                        </Typography>
                    </Box>
                </Box>
                <Box sx={preparationCellWrapperStyles}>
                    <Input 
                        multiline={true} 
                        value={operations?.additionalInfo ?? ''}
                        onChange={updateStringValues('additionalInfo')}
                        sx={{ width: '100%', bottom: '-0.5px', p: 0 }}
                    />
                </Box>
            </Box>
        </Box>
    )
};

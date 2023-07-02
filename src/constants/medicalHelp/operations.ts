import { MappingFieldsTypes } from "../../interfaces";
import { IMedicalOperations } from "../../api";

export const medicalOperationsFieldsNames: MappingFieldsTypes<IMedicalOperations> = {
    0: {
        name: 'Переливання крові',
        fieldName: 'bloodTransfusion',
    },
    1: {
        name: 'кровозамінників',
        fieldName: 'bloodSubstitute',
    },
    2: {
        name: 'іммобілізація',
        fieldName: 'immobilization',
    },
    3: {
        name: 'перев’зка',
        fieldName: 'dressing',
    },
    4: {
        name: 'накладений джгут',
        fieldName: 'bandage',
    },
    5: {
        name: 'санобробка',
        fieldName: 'sanitary',
    },
};

import { ITreatments } from "../../api";
import { MappingFieldsTypes } from "../../interfaces";

export const treatmentsFields: MappingFieldsTypes<ITreatments> = {
    0: {
        name: 'Антибіотик',
        fieldName: 'antibiotic',
    },
    1: {
        name: 'Сироватка ППС, ПГС',
        fieldName: 'serum',
    },
    2: {
        name: 'Анатоксин (який)',
        fieldName: 'toxoid',
    },
    3: {
        name: 'Антидот (який)',
        fieldName: 'antidote',
    },
    4: {
        name: 'Знебол. засіб',
        fieldName: 'painReliever',
    },
};

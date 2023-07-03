import { IForm100, RecordType, IEvacuation, SanitaryTreatmentStatus, IEvacuationClinic } from "../../api";
import { defaultPersonData } from "../person";

export const getInitialForm100 = (): IForm100 => {
    const newDate = new Date();
    return {
        id: 'create',
        author: '',
        clinic: '',
        person: defaultPersonData, 
        bodyImage: {
            back: [],
            front: [],
        },
        bodyDamage: [],
        date: newDate,
        accidentTime: undefined as unknown as Date,
        reason: '' as RecordType,
        medicalHelp: {
            treatments: {},
            operations: {}
        },
        evacuation: {
            clinic: [] as IEvacuationClinic[],
        } as IEvacuation,
        diagnosis: '',
        stage: '',
        fullDiagnosis: '',
        treatmentInfo: '',
        fullEvacuationInfo: '',
        result: '',
        firstAidInfo: '',
        sanitaryTreatment: '' as SanitaryTreatmentStatus
    };
};

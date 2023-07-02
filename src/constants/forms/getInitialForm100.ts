import { IForm100, RecordType, IEvacuation, SanitaryTreatmentStatus, IEvacuationClinic } from "../../api";
import { defaultPersonData } from "..";

export const getInitialForm100 = (): IForm100 => {
    const newDate = new Date();
    return {
        // TODO: id should be incrementally generated on back-end
        id: String(newDate.getTime()),
        author: '',
        clinic: '',
        person: defaultPersonData, 
        bodyImage: {
            back: [],
            front: [],
        },
        bodyDamage: [],
        date: newDate,
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

import { IForm100, RecordType, IEvacuation, SanitaryTreatmentStatus } from "../../api";
import { BodyImageFront, BodyImageBack } from "../../assets";

import { defaultPersonData } from "./components/PersonInfo";

export const getInitialForm100 = (): IForm100 => {
    const newDate = new Date();
    return {
        author: '',
        clinic: '',
        person: defaultPersonData, 
        bodyImage: {
            back: <BodyImageBack />,
            front: <BodyImageFront />,
        },
        bodyDamage: [],
        date: newDate,
        reason: '' as RecordType,
        medicalHelp: {
            treatments: {},
            operations: {}
        },
        evacuation: {} as IEvacuation,
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

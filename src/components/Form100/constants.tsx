import { IForm100, RecordType, IEvacuation } from "../../api";
import { BodyImageFront, BodyImageBack } from "../../assets";

import { getDefaultPersonData } from "./components/PersonInfo";

export const getInitialForm100 = (): IForm100 => {
    const newDate = new Date();
    return {
        author: '',
        clinic: '',
        person: getDefaultPersonData(newDate), 
        bodyImage: {
            back: <BodyImageBack />,
            front: <BodyImageFront />,
        },
        bodyDamage: [],
        date: newDate,
        reason: RecordType.INJURY,
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
    };
};

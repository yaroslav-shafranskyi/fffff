import { IForm100 } from "../../api/IForm100";
import { RecordType } from "../../api/IRecord";

export const initialForm100: Partial<IForm100> = {
    author: '',
    date: new Date(),
    reason: RecordType.INJURY,
    medicalHelp: {
        treatments: {},
        operations: {}
    },
    diagnosis: '',
    stage: '',
    fullDiagnosis: '',
    treatmentInfo: '',
    fullEvacuationInfo: '',
    result: '',
    firstAidInfo: ''
};

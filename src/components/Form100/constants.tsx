import { IPerson, IForm100, RecordType, IEvacuation } from "../../api";
import { BodyImageFront, BodyImageBack } from "../../assets";

export const initialForm100: IForm100 = {
    author: '',
    clinic: '',
    person: {} as IPerson, 
    bodyImage: {
        back: <BodyImageBack />,
        front: <BodyImageFront />,
    },
    bodyDamage: [],
    date: new Date(),
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
    firstAidInfo: ''
};

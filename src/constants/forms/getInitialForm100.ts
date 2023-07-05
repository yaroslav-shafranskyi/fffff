import {
  IForm100,
  RecordType,
  IEvacuation,
  SanitaryTreatmentStatus,
  IEvacuationClinic,
} from "../../api";
import { defaultPersonData } from "../person";

export const getInitialForm100 = (): IForm100 => {
  return {
    id: -1,
    author: "",
    clinic: "",
    person: defaultPersonData,
    bodyImage: {
      back: [],
      front: [],
    },
    bodyDamage: [],
    date: Date.now(),
    accidentTime: undefined as unknown as number,
    reason: "" as RecordType,
    medicalHelp: {
      treatments: {},
      operations: {},
    },
    evacuation: {
      clinic: [] as IEvacuationClinic[],
    } as IEvacuation,
    diagnosis: "",
    stage: "",
    fullDiagnosis: "",
    treatmentInfo: "",
    fullEvacuationInfo: "",
    result: "",
    firstAidInfo: "",
    sanitaryTreatment: "" as SanitaryTreatmentStatus,
  };
};

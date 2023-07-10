import { IConclusion } from "../../api";

export const defaultConclusion: IConclusion = {
  id: -1,
  person: {
    id: -1,
    fullName: "",
    birthDate: undefined as unknown as number,
  },
  department: "",
  clinic: "",
  code: "",
  order: {
    date: undefined as unknown as number,
    number: "",
  },
  sender: "",
  doctor: "",
  labResults: "",
  researchResults: "",
  diagnosis: "",
  recommendations: "",
  date: Date.now(),
  signature: "",
  headOfTheClinic: "",
  doctorId: -1,
};

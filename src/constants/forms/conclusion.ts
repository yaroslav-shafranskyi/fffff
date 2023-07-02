import { IConclusion } from "../../api";

export const defaultConclusion: IConclusion = {
    id: String(Date.now()),
    person: {
        id: String(Math.round(Math.random() * 1000000)),
        fullName: '',
        birthDate: undefined as unknown as Date,
    },
    department: '',
    clinic: '',
    code: '',
    order: {
        date: undefined as unknown as Date,
        number: '',
    },
    sender: '',
    doctor: '',
    labResults: '',
    researchResults: '',
    diagnosis: '',
    recommendations: '',
    date: new Date(),
    signature: '',
    headOfTheClinic: '',
};

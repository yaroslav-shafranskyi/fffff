import { Gender, IPerson, IRecord, Rank } from "../../../../api"

export type PersonDataType = Omit<IPerson, 'records' | 'birthDate'>;

export type PersonDataValuesType = string | Rank | Gender | IRecord

export type UpdatePersonDataType = (key: keyof PersonDataType, value: PersonDataValuesType, path?: string) => () => void;

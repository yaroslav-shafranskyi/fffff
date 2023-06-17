import { Gender, IPerson, IRecord, Rank } from "../../../../api"

export type PersonDataValuesType = string | Rank | Gender | IRecord[]

export type UpdatePersonDataType = (key: keyof IPerson, value: PersonDataValuesType, path?: string) => () => void;

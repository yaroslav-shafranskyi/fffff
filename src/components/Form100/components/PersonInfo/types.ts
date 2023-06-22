import { Gender, IPerson, IRecords, Rank } from "../../../../api"

export type PersonDataValuesType = string | Rank | Gender | IRecords

export type UpdatePersonDataType = (key: keyof IPerson, value: PersonDataValuesType, path?: string) => () => void;

import { Gender, IPerson, Rank } from "../../api";

export const defaultPersonData: IPerson = {
  rank: "" as Rank,
  militaryBase: "",
  fullName: "",
  id: -1,
  personalId: "",
  tokenNumber: "",
  gender: "" as Gender,
  records: [],
  lastRecords: {},
  address: {
    oblast: "",
    region: "",
    settlement: "",
    street: "",
    building: "",
    appartments: "",
  },
  birthDate: undefined as unknown as number,
};

import { IUserBrief, Rank, UserType, CorpsDataType } from "../../api";

export const defaultUserData: IUserBrief = {
  user: "",
  fullName: "",
  rank: "" as Rank,
  position: "",
  clinic: "",
  militaryBase: "",
  subdivision: "",
  corps: "" as CorpsDataType,
  phone: "",
  email: "",
  signature: "",
  id: -1,
  role: UserType.NONE,
};

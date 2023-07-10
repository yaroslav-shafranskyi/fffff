import { IUserBrief, Rank, UserType } from "../../api";

export const defaultUserData: IUserBrief = {
  user: "",
  fullName: "",
  rank: "" as Rank,
  position: "",
  clinic: "",
  militaryBase: "",
  subdivision: "",
  phone: "",
  email: "",
  signature: "",
  id: -1,
  role: UserType.NONE,
};

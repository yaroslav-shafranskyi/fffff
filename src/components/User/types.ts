import { UseOpenFormComponentType } from "../../interfaces";

export enum ManageUserMode {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  REMOVE = "REMOVE",
}

export type OpenUserType = UseOpenFormComponentType<{ mode: ManageUserMode }>;

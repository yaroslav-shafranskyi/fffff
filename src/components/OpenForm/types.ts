import { IPerson } from "../../api";

export type CallbackResponseType = {
  error?: string;
  url?: string;
  state?: unknown;
};
export interface IOpenFormDialog {
  title: string;
  onClose: () => void;
  goToCreateMode: (id?: number) => CallbackResponseType;
  goToUpdateMode: (person?: IPerson) => CallbackResponseType;
}

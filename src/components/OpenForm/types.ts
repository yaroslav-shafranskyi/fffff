import { IPerson } from "../../api";

export interface IOpenFormDialog {
    title: string;
    onClose: () => void;
    goToCreateMode: (id?: string) => () => void;
    goToUpdateMode: (person?: IPerson) => () => void;
}

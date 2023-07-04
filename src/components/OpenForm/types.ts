import { IPerson } from "../../api";

export interface IOpenFormDialog {
    title: string;
    error?: string;
    onClose: () => void;
    goToCreateMode: (id?: number) => () => void;
    goToUpdateMode: (person?: IPerson) => () => void;
}

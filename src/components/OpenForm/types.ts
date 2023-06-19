export interface IOpenFormDialog {
    title: string;
    onClose: () => void;
    goToCreateMode: () => void;
    goToUpdateMode: (id?: string) => () => void;
}

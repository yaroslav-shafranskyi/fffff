export interface IOpenFormDialog {
    title: string;
    onClose: () => void;
    goToCreateMode: (id?: string) => () => void;
    goToUpdateMode: (id?: string) => () => void;
}

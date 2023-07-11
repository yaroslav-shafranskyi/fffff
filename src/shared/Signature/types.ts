import { UseOpenFormComponentType } from "../../interfaces";

export interface ISignatureProps {
    variant?: 'outlined' | 'text';
    signature?: string;
    withHint?: boolean;
    onSubmit: (sig?: string) => void;
}

export type SignatureDialogType = UseOpenFormComponentType<ISignatureProps>;

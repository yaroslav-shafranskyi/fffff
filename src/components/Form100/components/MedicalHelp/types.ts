import { IMedicalHelp, IMedicalOperations, ITreatments } from '../../../../api';

export type UpdateMedicalHelpType = (key: keyof IMedicalHelp, value?: string | boolean, path?: keyof IMedicalOperations | keyof ITreatments) => void;

export interface IMedicalHelpProps {
    data?: IMedicalHelp;
    onChange?: UpdateMedicalHelpType;
}

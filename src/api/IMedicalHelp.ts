export interface ITreatments {
    antibiotic?: string;
    serum?: string;
    toxoid?: string;
    antidote?: string;
    painReliever?: string;
}

export interface IMedicalOperations {
    bloodTransfusion?: string;
    bloodSubstitute?: string;
    immobilization?: string;
    dressing?: string;
}

export interface IMedicalHelp {
    treatments: ITreatments;
    operations: IMedicalOperations;
}

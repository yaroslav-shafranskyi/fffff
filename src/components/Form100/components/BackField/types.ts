export interface IBackFieldProps {
    field: 'fullDiagnosis' | 'treatmentInfo' | 'fullEvacuationInfo' | 'result' | 'carriedBy' | 'firstAidInfo';
    title: string;
    rows?: number;
}

import { SxProps } from "@mui/material";

export interface IBackFieldProps {
    field: 'fullDiagnosis' | 'treatmentInfo' | 'fullEvacuationInfo' | 'result' | 'carriedBy' | 'firstAidInfo';
    title: string;
    rows?: number;
    titleStyles?: SxProps;
}

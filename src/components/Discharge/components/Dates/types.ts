export interface ISingleDateFieldProps {
    title: string;
    value: number;
    error?: string;
    onChange: (date?: Date) => void;
}

export interface ISingleDateFieldProps {
    title: string;
    value: Date;
    error?: string;
    onChange: (date?: Date) => void;
}

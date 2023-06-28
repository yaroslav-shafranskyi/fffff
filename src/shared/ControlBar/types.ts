export interface IControlBarProps {
    title?: string;
    submitButtonText?: string;
    onSubmit?: () => void;
    onClear?: () => void;
    onBack?: () => void;
}

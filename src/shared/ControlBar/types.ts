export interface IControlBarProps {
    title?: string;
    submitButtonText?: string;
    disabledButtons?: {
        submit?: boolean;
        clear?: boolean;
        back?: boolean;
    };
    onSubmit?: () => void;
    onClear?: () => void;
    onBack?: () => void;
}

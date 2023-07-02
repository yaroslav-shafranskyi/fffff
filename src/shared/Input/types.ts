import { TextFieldProps } from "@mui/material";

export interface IInputProps extends Omit<TextFieldProps, 'error' > {
    error?: string;
}

import { SelectProps } from "@mui/material";

export interface ISelectProps extends Omit<SelectProps, 'error' > {
    error?: string;
    options: string[] | number[];
}
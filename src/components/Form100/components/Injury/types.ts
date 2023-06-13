import { IInjury } from "../../../../api";

export interface IInjuryProps {
    data?: IInjury;
    onChange?: (injuryType: keyof IInjury, injury?: boolean) => void;
}

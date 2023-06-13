import { IEvacuation } from "../../../../api";

export interface IEvacuationClinicProps {
    data?: IEvacuation['clinic'];
    onChange?: (clinic?: IEvacuation['clinic']) => void;
}

import { IForm100 } from "../../api";

type Form100BackValues = 'firstAidInfo' | 'timeAfterAccident' | 'carriedBy' | 'selfLeave' | 'result' | 'fullEvacuationInfo' | 'treatmentInfo' | 'fullDiagnosis' | 'stage';

export type IForm100FrontState = Omit<IForm100, Form100BackValues | 'id'>;

export interface IForm100BackState extends Pick<IForm100, Form100BackValues> {
    signature?: IForm100['signature'];
    date: IForm100['date'];
}

export interface IForm100State {
    front: IForm100FrontState;
    back: IForm100BackState;
    id: number;
}

export interface IForm100PageProps {
    readonly?: boolean;
    initialForm100: IForm100;
    onSubmit: (f: IForm100) => void;
}

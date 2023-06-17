import { IEvacuation, IForm100 } from "../../../../api";

export interface ICounterfoilFrontData extends Pick<IForm100, 'date' | 'diagnosis' | 'medicalHelp'| 'injury' | 'reason' | 'person' > {
    evacuation: Pick<IEvacuation, 'transport' | 'clinic'>;
}

export interface ICounterfoilFrontProps {
    readonly?: boolean;
}

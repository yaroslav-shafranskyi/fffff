import { IEvacuation, IForm100 } from "../../../../api";

import { PersonDataType } from "../PersonInfo/types";

export interface ICounterfoilFrontData extends Pick<IForm100, 'date' | 'person' | 'diagnosis' | 'medicalHelp'| 'injury' | 'reason' > {
    evacuation: Pick<IEvacuation, 'transport' | 'clinic'>;
}

export interface ICounterfoilFrontProps {
    data?: ICounterfoilFrontData;
}

export interface ICounterfoilFrontState extends Partial<Omit<ICounterfoilFrontData, 'person'>>, Partial<PersonDataType> {}

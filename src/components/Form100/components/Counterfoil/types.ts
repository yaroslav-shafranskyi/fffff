import { IEvacuation, IForm100 } from "../../../../api";

import { PersonDataType } from "../PersonInfo/types";

export interface ICounterfoilFrontData extends Pick<IForm100, 'date' | 'diagnosis' | 'medicalHelp'| 'injury' | 'reason' > {
    evacuation: Pick<IEvacuation, 'transport' | 'clinic'>;
    person: PersonDataType;
}

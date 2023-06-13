import { IEvacuation, IForm100 } from "../../../../api";

import { PersonDataType } from "../PersonInfo/types";
import { UpdateForm100Type } from "../../types";

export interface ICounterfoilFrontData extends Pick<IForm100, 'date' | 'diagnosis' | 'medicalHelp'| 'injury' | 'reason' > {
    evacuation: Pick<IEvacuation, 'transport' | 'clinic'>;
    person: PersonDataType;
}

export interface ICounterfoilFrontProps {
    data?: ICounterfoilFrontData;
    onChange?: UpdateForm100Type;
}

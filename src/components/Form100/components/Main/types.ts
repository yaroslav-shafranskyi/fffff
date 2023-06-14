import { IForm100 } from "../../../../api";
import { UpdateForm100Type } from "../../types";

import { PersonDataType } from "../PersonInfo/types";

export interface IMainFrontData extends Omit<IForm100, 'person' | 'stage' | 'fullDiagnosis' | 'treatmentInfo' | 'fullEvacuationInfo' | 'result' | 'author' | 'selfLeave' | 'carriedBy' | 'timeAfterAccident' | 'firstAidInfo' > {
    person: PersonDataType;
}

export interface IMainFrontProps {
    data?: IMainFrontData;
    onChange?: UpdateForm100Type;
}

export interface IMainFrontState extends IMainFrontData {
    plaitHour?: number;
    plaitMinute?: number;
    plaitDay?: number;
    plaitMonth?: number;
    plaitYear?: number;
}

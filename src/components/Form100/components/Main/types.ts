import { IForm100 } from "../../../../api";

import { PersonDataType } from "../PersonInfo/types";

export interface IMainFrontData extends Omit<IForm100, 'person' | 'stage' | 'fullDiagnosis' | 'treatmentInfo' | 'fullEvacuationInfo' | 'result' | 'author' | 'selfLeave' | 'carriedBy' | 'timeAfterAccident' | 'firstAidInfo' > {
    person: PersonDataType;
    plaitHour?: number;
    plaitMinute?: number;
    plaitDay?: number;
    plaitMonth?: number;
    plaitYear?: number;
}

export interface IMainFrontProps {
    data?: IMainFrontData;
}

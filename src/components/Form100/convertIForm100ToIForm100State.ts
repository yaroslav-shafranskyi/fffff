import { IForm100 } from "../../api";
import { getInitialForm100 } from "../../constants";

import { IForm100State } from "./types";

export const convertIForm100ToIForm100State = (data?: IForm100): IForm100State => {
    const {
        clinic,
        author,
        person,
        date,
        reason,
        bodyImage,
        bodyDamage,
        injury,
        medicalHelp,
        plait,
        sanitaryTreatment,
        evacuation,
        diagnosis,
        signature,
        stage,
        fullDiagnosis,
        treatmentInfo,
        fullEvacuationInfo,
        result,
        selfLeave,
        carriedBy,
        timeAfterAccident,
        firstAidInfo,
    } = data ?? getInitialForm100();

    return {
        front: {
            clinic,
            author,
            person,
            date,
            reason,
            bodyImage,
            bodyDamage,
            injury,
            medicalHelp,
            plait,
            sanitaryTreatment,
            evacuation,
            diagnosis,
            signature,
        },
        back: {
            date,
            signature,
            stage,
            fullDiagnosis,
            treatmentInfo,
            fullEvacuationInfo,
            result,
            selfLeave,
            carriedBy,
            timeAfterAccident,
            firstAidInfo
        },
    }
}
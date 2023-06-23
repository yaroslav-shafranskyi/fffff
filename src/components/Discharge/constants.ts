import { DischargeReason, IDischargeDates } from "../../api";
import { defaultPersonData } from "../../constants";

import { DischargeBackPageState, DischargeFrontPageState } from "./types";

export const defaultDischargeFrontPageState: DischargeFrontPageState = {
    department: '',
    clinic: '',
    order: {
        date: undefined as unknown as Date,
        number: undefined as unknown as number,
    },
    receiver: '',
    person: defaultPersonData,
    datesData: {} as IDischargeDates,
    reason: '' as DischargeReason,
    fullDiagnosis: '',
    code: '',
};

export const defaultDischargeBackPageState: DischargeBackPageState = {
    doctor: '',
    date: new Date(),
    recommendations: '',
    info: '',
};

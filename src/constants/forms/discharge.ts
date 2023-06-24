import { DischargeReason, IDischargeDates } from "../../api";
import { DischargeBackPageState, DischargeFrontPageState } from '../../components'

import { defaultPersonData } from "../person";

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
    id: '',
};

export const defaultDischargeBackPageState: DischargeBackPageState = {
    doctor: '',
    date: new Date(),
    recommendations: '',
    info: '',
};

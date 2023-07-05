import { DischargeReason, IDischarge, IDischargeDates } from "../../api";
import {
  DischargeBackPageState,
  DischargeFrontPageState,
} from "../../components";

import { defaultPersonData } from "../person";

export const defaultDischargeFrontPageState: DischargeFrontPageState = {
  department: "",
  clinic: "",
  order: {
    date: undefined as unknown as Date,
    number: "",
  },
  receiver: "",
  person: defaultPersonData,
  datesData: {} as IDischargeDates,
  reason: "" as DischargeReason,
  fullDiagnosis: "",
  code: "",
};

export const defaultDischargeBackPageState: DischargeBackPageState = {
  doctor: "",
  date: new Date(),
  recommendations: "",
  info: "",
};

export const defaultDischargeData: IDischarge = {
  ...defaultDischargeBackPageState,
  ...defaultDischargeFrontPageState,
  id: -1,
};

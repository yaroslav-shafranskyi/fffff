import { IDischarge } from "../../api";

type BackBageFields =
  | "doctor"
  | "date"
  | "recommendations"
  | "info"
  | "signature";

export type DischargeFrontPageState = Omit<IDischarge, BackBageFields | 'id'>;

export type DischargeBackPageState = Pick<IDischarge, BackBageFields>;

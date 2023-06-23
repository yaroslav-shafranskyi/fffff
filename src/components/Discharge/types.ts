import { IDischarge } from "../../api";

export type DischargeFrontPageState = Omit<IDischarge, 'doctor' | 'date' | 'recommendations' | 'info'>;

export type DischargeBackPageState = Pick<IDischarge, 'doctor' | 'date' | 'recommendations' | 'info'>;

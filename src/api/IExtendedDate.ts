import { IDateData } from "../interfaces";

export interface IExtendedDate extends Partial<IDateData> {
    date: number;
}

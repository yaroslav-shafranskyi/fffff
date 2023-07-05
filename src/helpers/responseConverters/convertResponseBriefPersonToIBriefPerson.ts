import { converStringOrUndefinedToDateOrUndefined } from ".";
import { IPersonBrief, IResponsePersonBrief } from "../../api";

export const convertResponseBriefPersonToIBriefPerson = (
  data: IResponsePersonBrief
): IPersonBrief => ({
  ...data,
  birthDate: converStringOrUndefinedToDateOrUndefined(data.birthDate),
  lastRecordDate: converStringOrUndefinedToDateOrUndefined(data.lastRecordDate),
});

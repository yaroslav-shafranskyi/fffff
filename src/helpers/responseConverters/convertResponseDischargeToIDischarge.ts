import { converStringOrUndefinedToDateOrUndefined } from ".";
import { IDischarge, IResponseDischarge, IResponsePerson } from "../../api";
import { defaultDischargeData } from "../../constants";
import { convertResponsePersonToIPerson } from "./convertResponsePersonToIPerson";

export const convertResponseDischargeToIDischarge = (
  response?: IResponseDischarge
): IDischarge => {
  if (!response) {
    return defaultDischargeData;
  }
  const { date, datesData, order, person, ...data } = response;

  return {
    ...data,
    date: converStringOrUndefinedToDateOrUndefined(date) as Date,
    datesData: {
      sick: converStringOrUndefinedToDateOrUndefined(datesData.sick) as Date,
      referral: converStringOrUndefinedToDateOrUndefined(
        datesData.referral
      ) as Date,
      arrival: converStringOrUndefinedToDateOrUndefined(
        datesData.arrival
      ) as Date,
      leaving: converStringOrUndefinedToDateOrUndefined(
        datesData.leaving
      ) as Date,
    },
    order: {
      date: converStringOrUndefinedToDateOrUndefined(order.date) as Date,
      number: order.number,
    },
    person: convertResponsePersonToIPerson(person as unknown as IResponsePerson),
  };
};

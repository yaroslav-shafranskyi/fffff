import { converStringOrUndefinedToDateOrUndefined } from ".";
import { IPerson, IResponsePerson } from "../../api";
import { defaultPersonData } from "../../constants";

export const convertResponsePersonToIPerson = (
  data?: IResponsePerson
): IPerson => {
  if (!data) {
    return defaultPersonData;
  }

  const { birthDate: dataBirthDate, records: dataRecords, ...restData } = data;

  return {
    ...restData,
    birthDate: converStringOrUndefinedToDateOrUndefined(dataBirthDate),
    records: (dataRecords ?? []).map((record) => ({
      ...record,
      id: record.formId,
      date: converStringOrUndefinedToDateOrUndefined(record.date) as Date,
    })),
  };
};

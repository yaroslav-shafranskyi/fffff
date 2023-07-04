import { IForm100, IResponseForm100 } from "../../api";
import { getInitialForm100 } from "../../constants";

import { converStringOrUndefinedToDateOrUndefined } from "./converStringOrUndefinedToDateOrUndefined";

export const convertResForm100ToIForm100 = (
  resForm100?: IResponseForm100
): IForm100 => {
  if (!resForm100) {
    return getInitialForm100();
  }

  const { accidentTime, plait, date, person, ...rest } = resForm100;

  const plaitDate = converStringOrUndefinedToDateOrUndefined(plait);

  return {
    ...rest,
    person: {
      ...person,
      birthDate: converStringOrUndefinedToDateOrUndefined(person.birthDate),
    },
    accidentTime: converStringOrUndefinedToDateOrUndefined(
      accidentTime
    ) as Date,
    plait: !plaitDate
      ? undefined
      : {
          status: !!plaitDate,
          date: plaitDate,
        },
    date: converStringOrUndefinedToDateOrUndefined(date) ?? new Date(),
  };
};

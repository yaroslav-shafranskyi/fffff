import { useMemo } from "react";
import { QueryKey, UseQueryOptions, useQuery } from "@tanstack/react-query";

import {
  serviceUrl,
  getUrl,
  dischargeUrl,
  defaultDischargeData,
} from "../../constants";
import { IDischarge, useGetUser } from "../../api";
import { http } from "../../helpers";

export const useGetDischarge = (
  personId: string,
  id: string,
  options?: UseQueryOptions<IDischarge>
) => {
  const { id: doctorId } = useGetUser();

  const queryKey: QueryKey = useMemo(
    () => ["discharge", personId, id, doctorId],
    [personId, id, doctorId]
  );

  const queryFunction = () =>
    http.post(`${serviceUrl}${dischargeUrl}${getUrl}`, {
      id,
      personId,
      doctorId,
    }) as unknown as IDischarge;

  const res = useQuery<IDischarge>(queryKey, queryFunction, options);

  const convertedData = res?.data;

  return {
    ...res,
    discharge: {
      ...defaultDischargeData,
      ...convertedData,
      date: convertedData?.date ?? defaultDischargeData.date,
    },
  };
};

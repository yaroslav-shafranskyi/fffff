import { useMemo } from "react";
import { QueryKey, UseQueryOptions, useQuery } from "@tanstack/react-query";

import {
  serviceUrl,
  getUrl,
  dischargeUrl,
  defaultDischargeData,
} from "../../constants";
import { IDischarge } from "../../api";
import { http } from "../../helpers";

export const useGetDischarge = (
  personId: string,
  id: string,
  options?: UseQueryOptions<IDischarge>
) => {
  const queryKey: QueryKey = useMemo(
    () => ["forms100", personId, id],
    [personId, id]
  );

  const queryFunction = () =>
    http.post(`${serviceUrl}${dischargeUrl}${getUrl}`, {
      id,
      personId,
    }) as unknown as IDischarge;

  const res = useQuery<IDischarge>(queryKey, queryFunction, {
    ...options,
    enabled: options?.enabled !== false && !!id && id !== "create",
  });

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

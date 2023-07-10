import { useMemo } from "react";
import { QueryKey, UseQueryOptions, useQuery } from "@tanstack/react-query";

import {
  serviceUrl,
  getUrl,
  conclusionUrl,
  defaultConclusion,
} from "../../constants";
import { IConclusion, useGetUser } from "../../api";
import { http } from "../../helpers";

export const useGetConclusion = (
  personId: string,
  id: string,
  options?: UseQueryOptions<IConclusion>
) => {
  const { id: doctorId } = useGetUser();
  
  const queryKey: QueryKey = useMemo(
    () => [conclusionUrl, personId, id, doctorId],
    [personId, id, doctorId]
  );

  const queryFunction = () =>
    http.post(`${serviceUrl}${conclusionUrl}${getUrl}`, {
      id,
      personId,
      doctorId
    }) as unknown as IConclusion;

  const res = useQuery<IConclusion>(queryKey, queryFunction, options);

  return {
    ...res,
    conclusion: {
      ...defaultConclusion,
      ...res?.data,
    },
  };
};

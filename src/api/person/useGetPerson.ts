import { useMemo } from "react";
import { QueryKey, UseQueryOptions, useQuery } from "@tanstack/react-query";

import { serviceUrl, personsUrl, getUrl } from "../../constants";
import { IPerson } from "../../api";
import { http } from "../../helpers";

export const useGetPerson = (
  id?: string,
  options?: UseQueryOptions<IPerson>
) => {
  const queryKey: QueryKey = useMemo(() => [personsUrl, getUrl, id], [id]);

  const queryFunction = () =>
    http.post(`${serviceUrl}${personsUrl}${getUrl}`, {
      id,
    }) as unknown as IPerson;

  const res = useQuery<IPerson>(queryKey, queryFunction, {
    ...options,
    enabled: options?.enabled !== false && id !== undefined && id !== "create",
  });

  return {
    ...res,
    person: res?.data,
  };
};

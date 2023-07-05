import { useMemo } from "react";
import { QueryKey, UseQueryOptions, useQuery } from "@tanstack/react-query";

import {
  serviceUrl,
  form100Url,
  getInitialForm100,
  getUrl,
} from "../../constants";
import { IForm100 } from "../../api";
import { http } from "../../helpers";

export const useGetForm100 = (
  personId: string,
  id: string,
  options?: UseQueryOptions<IForm100>
) => {
  const queryKey: QueryKey = useMemo(
    () => ["forms100", personId, id],
    [personId, id]
  );

  const queryFunction = () =>
    http.post(`${serviceUrl}${form100Url}${getUrl}`, {
      id,
      personId,
    }) as unknown as IForm100;

  const res = useQuery<IForm100>(queryKey, queryFunction, options);

  return {
    ...res,
    form100: {
      ...getInitialForm100(),
      ...res?.data,
    },
  };
};

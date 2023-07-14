import { useMemo } from "react";
import { QueryKey, UseQueryOptions, useQuery } from "@tanstack/react-query";

import {
  serviceUrl,
  form100Url,
  getInitialForm100,
  getUrl,
} from "../../constants";
import { IForm100, useGetUser } from "../../api";
import { http, mergeObjects } from "../../helpers";

const emptyObj = {} as IForm100;

export const useGetForm100 = (
  personId: string,
  id: string,
  options?: UseQueryOptions<IForm100>
) => {
  const { id: doctorId } = useGetUser();

  const queryKey: QueryKey = useMemo(
    () => [form100Url, personId, id, doctorId],
    [personId, id, doctorId]
  );

  const queryFunction = () =>
    http.post(`${serviceUrl}${form100Url}${getUrl}`, {
      id,
      personId,
      doctorId,
    }) as unknown as IForm100;

  const res = useQuery<IForm100>(queryKey, queryFunction, options);

  return {
    ...res,
    form100: mergeObjects(getInitialForm100(), res?.data ?? emptyObj),
  };
};

import { useMemo } from "react";
import { QueryKey, UseQueryOptions, useQuery } from "@tanstack/react-query";

import { serviceUrl, briefsUrl } from "../../constants";
import { IUserBriefRecord, QueryUserRecordsData, useGetUser } from "..";

import { IQuery } from "../../interfaces";
import { getInitialQuery } from "../../constants";
import { http } from "../../helpers";

const emptyArray: [] = [];

export const useQueryUserRecords = (
  query?: IQuery<IUserBriefRecord>,
  options?: UseQueryOptions<QueryUserRecordsData>
) => {
  const { id } = useGetUser();

  const { iterator, sortBy, filterBy } = query ?? getInitialQuery();
  const queryKey: QueryKey = useMemo(
    () => [briefsUrl, id, iterator, sortBy, filterBy],
    [id, iterator, sortBy, filterBy]
  );

  const queryFunction = () =>
    http.post(`${serviceUrl}${briefsUrl}`, {
      id,
      query,
    }) as unknown as QueryUserRecordsData;

  const res = useQuery<QueryUserRecordsData>(queryKey, queryFunction, {
    ...options,
    enabled: options?.enabled !== false && id !== undefined,
  });

  return {
    ...res,
    records: res?.data?.entities ?? emptyArray,
    total: res?.data?.total ?? 0,
  };
};

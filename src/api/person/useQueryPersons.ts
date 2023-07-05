import { useMemo } from "react";
import { QueryKey, UseQueryOptions, useQuery } from "@tanstack/react-query";

import { serviceUrl, personsUrl } from "../../constants";
import { IPersonBrief, QueryPersonsData } from "../../api";

import { IQuery } from "../../interfaces";
import { getInitialQuery } from "../../constants";
import { http } from "../../helpers";

const emptyArray: [] = [];

export const useQueryPersons = (
  query?: IQuery<IPersonBrief>,
  options?: UseQueryOptions<QueryPersonsData>
) => {
  const { iterator, sortBy, filterBy } = query ?? getInitialQuery();
  const queryKey: QueryKey = useMemo(
    () => [personsUrl, iterator, sortBy, filterBy],
    [iterator, sortBy, filterBy]
  );

  const queryFunction = () =>
    http.get(`${serviceUrl}${personsUrl}`) as unknown as QueryPersonsData;

  const res = useQuery<QueryPersonsData>(queryKey, queryFunction, options);

  return {
    ...res,
    persons: res?.data?.entities ?? emptyArray,
    total: res?.data?.total ?? 0,
  };
};

import { useMemo } from "react";
import { QueryKey, UseQueryOptions, useQuery } from "@tanstack/react-query";

import { serviceUrl, personsUrl } from "../../constants";
import { IPerson, IResponsePerson, QueryPersonsData } from "../../api";

import { IQuery } from "../../interfaces";
import { getInitialQuery } from "../../constants";
import { http } from "../../helpers";
import { convertResponsePersonToIPerson } from "../../helpers/responseConverters/convertResponsePersonToIPerson";

const emptyArray: [] = [];

export const useQueryPersons = (
  query?: IQuery<IPerson>,
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
    persons: (
      (res?.data?.entities ?? emptyArray) as unknown as IResponsePerson[]
    ).map(convertResponsePersonToIPerson),
    total: res?.data?.total ?? 0,
  };
};

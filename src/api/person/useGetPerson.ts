import { useMemo } from 'react';
import { QueryKey, UseQueryOptions, useQuery } from "@tanstack/react-query";

import { serviceUrl, personsUrl, defaultPersonData, getUrl } from '../../constants';
import { IPerson } from "../../api";
import { http } from '../../helpers';

export const useGetPerson = (id: string, options?: UseQueryOptions<IPerson>) => {
    const queryKey: QueryKey = useMemo(() => ['persons', id], [id]);

    const queryFunction = () => http.post(`${serviceUrl}${personsUrl}${getUrl}`, { id }) as unknown as IPerson;

    const res = useQuery<IPerson>(queryKey, queryFunction, options);

    return {
        ...res,
        person: {
            ...res?.data,
            birthDate: !res?.data?.birthDate ? undefined : new Date(res.data.birthDate as unknown as string)
        } as IPerson ?? defaultPersonData
    };
};

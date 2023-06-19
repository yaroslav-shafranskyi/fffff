import { useQuery, useQueryClient } from "@tanstack/react-query";

import { defaultPersonData } from "../../constants";

import { IPerson } from "../IPerson";

export const useGetPerson = (id: string) => {
    const queryClient = useQueryClient();

    const res = useQuery(['person', id], () => 
        queryClient.getQueryData<IPerson>(['person', id]),
        {
            enabled: !!id,
        }
    );

    return res ?? defaultPersonData
}
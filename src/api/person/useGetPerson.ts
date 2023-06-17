import { useQuery, useQueryClient } from "@tanstack/react-query";
import { defaultPersonData } from "../../components/Form100/components/PersonInfo";
import { IPerson } from "..";

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
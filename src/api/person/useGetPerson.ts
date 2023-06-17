import { useQuery, useQueryClient } from "@tanstack/react-query";
import { defaultPersonData } from "../../components/Form100/components/PersonInfo";

export const useGetPerson = (id: string) => {
    const queryClient = useQueryClient();

    const res = useQuery(['person', id], () => 
        queryClient.getQueryData(['person', id])
    );

    return res ?? defaultPersonData
}
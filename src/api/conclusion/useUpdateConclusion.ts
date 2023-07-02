import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { IConclusion } from "../IConclusion";

export const useUpdateConclusion = () => {
    const queryClient = useQueryClient();

    const mutate = useCallback((data: IConclusion) => {
        const { person, id: formId } = data;
        queryClient.setQueryData(['conclusion', person.id, formId], data);
        queryClient.setQueryData(['conclusion', person.id, undefined], data)
    }, [queryClient]);

    return { mutate };
};

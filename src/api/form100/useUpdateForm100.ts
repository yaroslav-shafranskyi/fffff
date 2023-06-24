import { useQueryClient } from "@tanstack/react-query";

import { IForm100 } from "../IForm100";
import { useCallback } from "react";

export const useUpdateForm100 = () => {
    const queryClient = useQueryClient();

    const mutate = useCallback((form100: IForm100) => {
        const { person, id } = form100;
        queryClient.setQueryData(['form100', person.id, id], form100);
        queryClient.setQueryData(['form100', person.id, undefined], form100);
    }, [queryClient]);

    return { mutate };
};

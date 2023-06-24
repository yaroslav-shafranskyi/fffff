import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { IDischarge } from "../IDischarge";

export const useUpdateDischarge = () => {
    const queryClient = useQueryClient();

    const mutate = useCallback((discharge: IDischarge) => {
        const { id, person } = discharge;

        queryClient.setQueryData(['discharge', person.id, id], discharge);
        queryClient.setQueryData(['discharge', person.id, undefined], discharge);
    }, [queryClient]);

    return { mutate };
}
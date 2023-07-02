import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { IReferral } from "../IReferral";

export const useUpdateReferral = () => {
    const queryClient = useQueryClient();

    const mutate = useCallback((referral: IReferral) => {
        const { id: formId, personId } = referral;
        queryClient.setQueryData(['referral', personId, formId], referral);
        queryClient.setQueryData(['referral', personId, undefined], referral);
    }, [queryClient]);

    return { mutate };
};

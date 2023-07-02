import { useQueryClient } from "@tanstack/react-query";

import { defaultReferralData } from "../../constants";

import { IReferral } from "../IReferral";

export const useGetReferral = (personId: string, formId: string) => {
    const queryClient = useQueryClient();

    const data = queryClient.getQueryData<IReferral>(['referral', personId, formId]);

    return data ?? defaultReferralData;
};

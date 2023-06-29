import { useQueryClient } from "@tanstack/react-query";

import { defaultConclusion } from "../../constants";

import { IConclusion } from "../IConclusion";

export const useGetConclusion = (personId: string, formId: string) => {
    const queryClient = useQueryClient();

    const data = queryClient.getQueryData<IConclusion>(['conclusion', personId, formId]);

    return data ?? defaultConclusion;
}
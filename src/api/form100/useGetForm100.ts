import { useQueryClient } from "@tanstack/react-query";
import { IForm100 } from "../IForm100";
import { getInitialForm100 } from "../../constants";

export const useGetForm100 = (personId: string, formId: string) => {
    const queryClient = useQueryClient();

    const data = queryClient.getQueryData<IForm100>(['form100', personId, formId]);

    return data ?? getInitialForm100();
}
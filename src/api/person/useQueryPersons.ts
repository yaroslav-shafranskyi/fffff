import { useQueryClient } from "@tanstack/react-query";
import { IPerson } from "../IPerson";

export const useQueryPersons = (name?: string) => {
    const queryClient = useQueryClient();

    const allPersons = queryClient.getQueryData<IPerson[]>(['persons']) ?? [];
    if (name && name.length < 3) {
        return [];
    }

    if (!name) {
        return allPersons;
    }

    return allPersons.filter(({ fullName }) => fullName.toLowerCase().includes(name.toLowerCase()));
};

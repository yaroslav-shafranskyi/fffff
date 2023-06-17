import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { snackbar } from "../../shared";

import { IPerson } from "../IPerson";

export const useUpdatePerson = () => {
    const queryClient = useQueryClient();

    const mutate = useCallback((person: IPerson) => {
        queryClient.setQueryData(['person', person.id], person);

        const allPersons = queryClient.getQueryData<IPerson[]>(['persons']) ?? [];

        const updatedPersonIdx = allPersons.findIndex(({ id }) => id === person.id);

        if (updatedPersonIdx < 0) {
            queryClient.setQueryData(['persons'], [...allPersons, person]);
            return;
        }

        queryClient.setQueryData(['persons'], [...allPersons.slice(0, updatedPersonIdx), person, ...allPersons.slice(updatedPersonIdx + 1)]);
    }, [queryClient])

    return {
        mutate
    };
};

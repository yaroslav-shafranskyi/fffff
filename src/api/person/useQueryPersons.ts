import { UseQueryOptions, useQueryClient } from "@tanstack/react-query";
import { IPerson } from "../IPerson";
import { IQuery, SortOrder } from "../../interfaces";
import { getInitialQuery } from "../../constants";

const mockedPerson = {
    id: '1234',
    fullName: 'Петренко Петро Петрович',
    birthDate: new Date(),
    rank: 'солдат',
    gender: 'Чол',
    militaryBase: '25',
    records: [{}, {}],
    lastRecord: { diagnosis: 'гіпертонія', date: new Date() },
}

const mockedPersons = Array(10).fill(mockedPerson).map((p, i) => ({ ...p, fullName: p.fullName + ' ' + i }));

const emptyArray: [] = [];

export const useQueryPersons = (query?: IQuery<IPerson>, options?: UseQueryOptions<IPerson>) => {
    const queryClient = useQueryClient();

    const { sortBy, filterBy, iterator } = query ?? getInitialQuery();
 
    const name = (filterBy?.fullName ?? '') as string;

    if (options?.enabled === false) {
        return emptyArray;
    }

    const allPersons = queryClient.getQueryData<IPerson[]>(['persons']) ?? emptyArray;

    const filteredPersons: IPerson[] = [];

    if (!query) {
        return allPersons;
    }

    /*
    if (name && name.length < 3) {
        // return allPersons;
        return emptyArray;
    }

    if (!name) {
        // return allPersons;
        return emptyArray;
    }
    */

    filteredPersons.push(...mockedPersons.filter(({ fullName }) => fullName.toLowerCase().includes(name.toLowerCase())));

    if (!sortBy) {
        return filteredPersons;
    }

    const [field, order] = Object.entries(sortBy)[0];

    if (order === SortOrder.DESC) {
        // @ts-expect-error its a temprorary function
        return [...filteredPersons.sort((a, b) => a[field] < b[field] ? 1 : -1)];
    }
    // @ts-expect-error its a temprorary function
    return [...filteredPersons.sort((a, b) => a[field] > b[field] ? 1 : -1)]
};

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

const mockedPersons = Array(100).fill(mockedPerson).map((p, i) => ({ ...p, fullName: p.fullName + ' ' + i }));

const emptyArray: [] = [];

export const useQueryPersons = (query?: IQuery<IPerson>, options?: UseQueryOptions<{data: IPerson[]; total: number; }>) => {
    const queryClient = useQueryClient();

    const { sortBy, filterBy, iterator } = query ?? getInitialQuery();

    const { page, rowsPerPage } = iterator;
 
    const name = (filterBy?.fullName ?? '') as string;

    if (options?.enabled === false) {
        return { data: emptyArray, total: 100 };
    }

    const allPersons = queryClient.getQueryData<IPerson[]>(['persons']) ?? emptyArray;

    const filteredPersons: IPerson[] = [];

    if (!query) {
        return { data: allPersons, total: 100 };
    }

    // if (name && name.length < 3) {
    //     // return allPersons;
    //     return emptyArray;
    // }

    // if (!name) {
    //     return allPersons ?? emptyArray;
    //     // return emptyArray;
    // }

    filteredPersons.push(...allPersons.filter(({ fullName }) => fullName.toLowerCase().includes(name.toLowerCase())).slice(page * rowsPerPage, (page + 1) * rowsPerPage));

    if (!sortBy) {
        return {
            data: filteredPersons,
            total: 100,
        };
    }

    const [field, order] = Object.entries(sortBy)[0];

    if (order === SortOrder.DESC) {
        return {
            // @ts-expect-error its a temprorary function
            data: [...filteredPersons.sort((a, b) => a[field] < b[field] ? 1 : -1)],
            total: 100,
        };
    }
    return {
        // @ts-expect-error its a temprorary function
        data: [...filteredPersons.sort((a, b) => a[field] > b[field] ? 1 : -1)],
        total: 100
    };
};

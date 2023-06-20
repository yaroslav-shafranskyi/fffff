import { UseQueryOptions, useQueryClient } from "@tanstack/react-query";
import { IPerson } from "../IPerson";
import { IQuery, SortOrder } from "../../interfaces";
import { getInitialQuery } from "../../constants";
import { ArmyRank } from "../Rank";
import { Gender } from "../Gender";
import { IRecord } from "../IRecord";

const mockedRecord = { diagnosis: 'гіпертонія', date: new Date(), fullDiagnosis: 'гіпертонія' } as IRecord;

const mockedPerson: IPerson = {
    id: '1234',
    tokenNumber: '1234',
    fullName: 'Петренко Петро Петрович',
    birthDate: new Date(),
    rank: ArmyRank.SOLDIER,
    gender: Gender.MALE,
    militaryBase: '25',
    records: [mockedRecord, mockedRecord],
    lastRecord: mockedRecord,
}

const mockedPersons: IPerson[] = Array(100).fill(mockedPerson).map((p, i) => 
    ({
        ...p,
        fullName: p.fullName + ' ' + i,
        lastRecord: {
            ...p.lastRecord,
            diagnosis: i % 2 ? 'високий тиск' : 'гіпертонія',
            fullDiagnosis: i % 2 ? 'високий тиск' : 'гіпертонія'
        },
        records: [
            {
                ...p.lastRecord,
                diagnosis: i % 2 ? 'високий тиск' : 'гіпертонія',
                fullDiagnosis: i % 2 ? 'високий тиск' : 'гіпертонія'
            },
        ],
    }));

const emptyArray: [] = [];

export const useQueryPersons = (query?: IQuery<IPerson>, options?: UseQueryOptions<{data: IPerson[]; total: number; }>) => {
    const queryClient = useQueryClient();

    const { sortBy, filterBy, iterator } = query ?? getInitialQuery();

    const { page, rowsPerPage } = iterator;
 
    const name = (filterBy?.fullName ?? '') as string;

    const anyFilter = (filterBy?.Any ?? '') as string;

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

    filteredPersons.push(
        ...mockedPersons
        .filter(({ fullName }) => fullName.toLowerCase().includes(name.toLowerCase()))
        .filter(({ fullName, records }) => fullName.toLowerCase().includes(anyFilter.toLowerCase()) || records.some(({ diagnosis, fullDiagnosis }) => 
            fullDiagnosis.includes(anyFilter.toLowerCase()) || diagnosis.includes(anyFilter.toLowerCase())))
        .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    );

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

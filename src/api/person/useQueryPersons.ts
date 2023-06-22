import { UseQueryOptions, useQueryClient } from "@tanstack/react-query";
import { IPerson } from "../IPerson";
import { IQuery, SortOrder } from "../../interfaces";
import { getInitialQuery } from "../../constants";
import { ArmyRank } from "../Rank";
import { Gender } from "../Gender";
import { IForm100Record } from "../IRecord";

const mockedBriefRecord = { date: new Date(), fullDiagnosis: 'гіпертонія' } as IForm100Record;
const mockedForm100Record = { ...mockedBriefRecord, diagnosis: 'гіпертонія', }

const mockedPerson: IPerson = {
    id: '1234',
    tokenNumber: '1234',
    fullName: 'Петренко Петро Петрович',
    birthDate: new Date(),
    rank: ArmyRank.SOLDIER,
    gender: Gender.MALE,
    militaryBase: '25',
    records: {
        form100: [mockedForm100Record, mockedForm100Record], 
        brief: [mockedBriefRecord, mockedBriefRecord],
    },
    lastRecords: { form100: mockedForm100Record as IForm100Record, brief: mockedBriefRecord },
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
        ...allPersons
        .filter(({ fullName }) => fullName.toLowerCase().includes(name.toLowerCase()))
        .filter(({ fullName, records }) => fullName.toLowerCase().includes(anyFilter.toLowerCase()) || records.form100.some(({ diagnosis, fullDiagnosis }) => 
            fullDiagnosis.includes(anyFilter.toLowerCase()) || diagnosis.includes(anyFilter.toLowerCase())))
    );

    if (!sortBy) {
        return {
            data: filteredPersons.slice(page * rowsPerPage, (page + 1) * rowsPerPage),
            total: filteredPersons.length,
        };
    }

    const [field, order] = Object.entries(sortBy)[0];

    if (order === SortOrder.DESC) {
        // @ts-expect-error its a temprorary function
        const data = [...filteredPersons.sort((a, b) => a[field] < b[field] ? 1 : -1)]
        return {
            data: data.slice(page * rowsPerPage, (page + 1) * rowsPerPage),
            total: data.length,
        };
    }
    // @ts-expect-error its a temprorary function
    const data =[...filteredPersons.sort((a, b) => a[field] > b[field] ? 1 : -1)];
    return {
        data: data.slice(page * rowsPerPage, (page + 1) * rowsPerPage),
        total: data.length,
    };
};

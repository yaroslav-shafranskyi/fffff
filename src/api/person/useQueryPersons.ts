import { UseQueryOptions, useQueryClient } from "@tanstack/react-query";
import { IPerson } from "../IPerson";
import { IQuery } from "../../interfaces";

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

const mockedPersons = Array(10).fill(mockedPerson);

const emptyArray: [] = [];

export const useQueryPersons = (query?: IQuery<IPerson>, options?: UseQueryOptions<IPerson>) => {
    const queryClient = useQueryClient();

    const name = query?.filterBy?.fullName as string;

    if (options?.enabled === false) {
        return emptyArray;
    }

    const allPersons = queryClient.getQueryData<IPerson[]>(['persons']) ?? emptyArray;

    if (!query) {
        return allPersons;
    }

    if (name && name.length < 3) {
        return mockedPersons;
    }

    if (!name) {
        return mockedPersons;
    }

    return mockedPersons.filter(({ fullName }) => fullName.toLowerCase().includes(name.toLowerCase()));
};

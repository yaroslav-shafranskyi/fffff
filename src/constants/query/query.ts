import { Iterator, IFilter, IQuery } from "../../interfaces"

export const initialIterator: Iterator = {
    page: 0,
    rowsPerPage: 10,
};

export const initialFilter: IFilter = {};


export const getInitialQuery = <T extends object>(): IQuery<T> => ({
    iterator: initialIterator,
    filterBy: initialFilter,
});

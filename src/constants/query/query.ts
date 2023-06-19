import { Iterator, IFilter, IQuery } from "../../interfaces"

export const initialIterator: Iterator = {
    from: 0,
    to: 10,
};

export const initialFilter: IFilter = {};


export const getInitialQuery = <T,>(): IQuery<T> => ({
    iterator: initialIterator,
    filterBy: initialFilter,
});

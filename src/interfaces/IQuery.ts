export interface Iterator {
    from: number;
    to: number;
}

export interface IFilter {
    [field: string]: unknown;
}

export enum SortOrder {
    ASC = 'ASC',
    DESC = 'DESC',
}

export interface ISort<TData = Record<string, unknown>> {
    order: SortOrder;
    field: keyof TData;
}

export interface IQuery<TData = Record<string, unknown>> {
    iterator: Iterator;
    sortBy?: ISort<TData>;
    filterBy: IFilter;
}

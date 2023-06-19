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

export type ISort<TData extends object> = {
    [field in keyof TData]: SortOrder;
};

export interface IQuery<TData extends object> {
    iterator: Iterator;
    sortBy?: ISort<TData>;
    filterBy: IFilter;
}

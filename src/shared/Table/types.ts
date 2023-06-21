import { Dispatch, ReactNode, SetStateAction } from 'react';
import { TableProps } from '@mui/material';
import { CellContext } from '@tanstack/react-table';

import { IFilter, IQuery, ISort, Iterator, SortOrder } from '../../interfaces';

export interface IColumn<T extends object> {
    title: string;
    key: string;
    accessor?: (data: T) => unknown;
    render: (props: CellContext<T, unknown>) => ReactNode;
}

export enum TableFilterType {
    STRING = 'string',
    DATE = 'Date',
    DATE_RANGE = 'DateRange',
}

export interface IFieldFilterData {
    key: string;
    placeholder?: string;
    title?: string;
    type?: TableFilterType;
    options?: string[];
}

export interface IFilterData {
    title?: string;
    fields: IFieldFilterData[];
}

export type SortTitlesType = { 
    optionTitle: string;
    infoTitle?: string;
};

export type FieldSortDataType = {
    [SortOrder.ASC]: SortTitlesType;
    [SortOrder.DESC]: SortTitlesType;
};

export type SortDataType = {
    [key: string] : FieldSortDataType;
};

export interface IQueryData {
    filters?: IFilterData[];
    globalFilter?: IFieldFilterData;
    sorts?: SortDataType;
}

export interface ITableProps<T extends object> extends TableProps {
    title?: string;
    data: T[];
    columns: IColumn<T>[];
    query?: IQuery<T>;
    total?: number;
    queryData?: IQueryData;
    goBack?: () => void;
    onQueryChange?: Dispatch<SetStateAction<IQuery<T>>>;
}

export interface IFilterProps<T extends object> {
    fieldFilterData: IFieldFilterData;
    columns?: IColumn<T>[];
    filterBy: IFilter;
    onChange: (filter: IFilter) => void;
}

export interface ISortProps<T extends object> {
    field: keyof T;
    fieldSortData: FieldSortDataType;
    sortBy?: ISort<T>;
    onChange: (sort?: ISort<T>) => void;
}

export interface IToolbarProps<T extends object> {
    title?: string;
    query?: IQuery<T>;
    columns: IColumn<T>[];
    queryData?: IQueryData;
    goBack?: () => void;
    onChange: (field: keyof IQuery<T>) => (value: unknown) => void;
}

export interface IPaginationProps {
    total: number;
    iterator: Iterator;
    onChange: (Iterator: Iterator) => void;
}

export interface IColumnsFiltersProps<T extends object> {
    queryData: IQueryData;
    query: IQuery<T>;
    onChange: (field: keyof IQuery<T>) => (value: unknown) => void;
}

export type IQueryInfoProps<T extends object> = IColumnsFiltersProps<T>;

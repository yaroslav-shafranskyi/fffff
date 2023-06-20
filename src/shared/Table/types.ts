import { Dispatch, ReactNode, SetStateAction } from 'react';
import { TableProps } from '@mui/material';
import { CellContext } from '@tanstack/react-table';

import { IFilter, IQuery, ISort, Iterator } from '../../interfaces';

export interface IColumn<T extends object> {
    title: string;
    key: string;
    accessor?: (data: T) => unknown;
    render: (props: CellContext<T, unknown>) => ReactNode;
}

export interface ITableProps<T extends object> extends TableProps {
    title?: string;
    data: T[];
    columns: IColumn<T>[];
    query?: IQuery<T>;
    total?: number;
    globalFilterPlaceholder?: string;
    goBack?: () => void;
    onQueryChange?: Dispatch<SetStateAction<IQuery<T>>>;
}

export interface IFilterProps<T extends object> {
    columns: IColumn<T>[];
    filterBy: IFilter;
    globalFilterPlaceholder?: string;
    onChange: (filter: IFilter) => void;
}

export interface ISortProps<T extends object> {
    field: keyof T;
    sortBy?: ISort<T>;
    onChange: Dispatch<SetStateAction<ISort<T>>>;
}

export interface IToolbarProps<T extends object> {
    title?: string;
    filterBy: IFilter;
    columns: IColumn<T>[];
    globalFilterPlaceholder?: string;
    clearFilter: (key: string) => () => void;
    goBack?: () => void;
    onChange?: (field: keyof IQuery<T>) => (value: unknown) => void;
}

export interface IPaginationProps {
    total: number;
    iterator: Iterator;
    onChange?: (Iterator: Iterator) => void;
}

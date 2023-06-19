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
    data: T[];
    columns: IColumn<T>[];
    query?: IQuery<T>;
    total?: number;
    onQueryChange?: Dispatch<SetStateAction<IQuery<T>>>;
}

export interface IFilterProps {
    field: string;
    isFocused: boolean;
    setFocused: (field?: string) => void;
    onChange: (filter: IFilter) => void;
}

export interface ISortProps<T extends object> {
    field: keyof T;
    sortBy?: ISort<T>;
    onChange: Dispatch<SetStateAction<ISort<T>>>;
}

export interface IToolbarProps<T extends object> {
    filterBy: IFilter;
    columns: IColumn<T>[];
    clearFilter: (key: string) => () => void;
}

export interface IPaginationProps {
    total: number;
    iterator: Iterator;
    onChange: (Iterator: Iterator) => void;
}

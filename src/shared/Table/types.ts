import { Dispatch, SetStateAction } from 'react';
import { TableProps } from '@mui/material';
import { TableOptions } from '@tanstack/react-table';

import { IFilter, IQuery, ISort } from '../../interfaces';

export interface ITableProps<T extends object> extends TableProps {
    data: T[];
    columns: TableOptions<T>['columns'];
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

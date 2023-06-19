import { Dispatch, SetStateAction } from 'react';
import { TableProps } from '@mui/material';
import { TableOptions } from '@tanstack/react-table';

import { IFilter, IQuery } from '../../interfaces';

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

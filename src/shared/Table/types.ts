import { TableProps } from '@mui/material';
import { Column, Table } from '@tanstack/react-table';

export interface ITableProps<T = unknown> extends TableProps {
    table: Table<T>;
    data: T[];
}

export interface IFilterProps<TData, TValue> {
    column: Column<TData, TValue>;
    table: Table<TData>;
}

import { Gender, IPerson } from "../../api";
import { formatDate } from "../../helpers";
import { SortOrder } from "../../interfaces";
import { IColumn, IQueryData, TableFilterType } from "../../shared";

export const columns: IColumn<IPerson>[] = [
    {
        title: 'ПІБ',
        render: p => p.getValue() as string,
        key: 'fullName',
    },
    {
        title: 'Звання',
        render: p => p.getValue() as string,
        key: 'rank',
    },
    {
        title: 'Посвідчення особи',
        render: p => p.getValue() as string,
        key: 'id',
    },
    {
        title: 'Дата народження',
        render: p => formatDate(p.getValue() as Date),
        key: 'birthDate',
    },
    {
        title: 'Стать',
        render: p => (p.getValue() as string).toLowerCase() + '.',
        key: 'gender',
    },
    {
        title: 'Військова частина',
        render: p => p.getValue() as string,
        key: 'militaryBase',
    },
    {
        title: 'К-ть звернень',
        render: p => p.getValue() as number,
        accessor: p => p.records.length,
        key: 'recordsLength',
    },
    {
        title: 'Крайнє звернення',
        render: p => formatDate(p.getValue() as Date),
        accessor: p => p.lastRecord.date,
        key: 'lastRecordDate',
    },
    {
        title: 'Крайній діагноз',
        render: p => p.getValue() as string,
        accessor: p => p.lastRecord.diagnosis,
        key: 'lastRecordDiagnosis',
    },
];

export const queryData: IQueryData = {
    globalFilter: {
        key: 'Any',
        placeholder: 'Впишіть ПІБ або діагноз...',
    },
    filters: [
        {
            title: 'Особиста інформація:',
            fields: [
                {
                    key: 'fullName',
                    title: 'ПІБ',
                },
                {
                    key: 'rank',
                    title: 'Звання',
                },
                {
                    key: 'id',
                    title: 'Посвідчення особи',
                },
                {
                    key: 'birthDate',
                    title: 'Дата народження',
                    type: TableFilterType.DATE,
                },
                {
                    key: 'gender',
                    title: 'Стать',
                    options: [Gender.MALE, Gender.FEMALE],
                },
                {
                    title: 'Військова частина',
                    key: 'militaryBase',
                },
            ],
        },
        {
            title: 'Звернення:',
            fields: [
                {
                    title: 'К-ть звернень',
                    key: 'recordsLength',
                },
                {
                    title: 'Дата звернення',
                    key: 'recordDate',
                    type: TableFilterType.DATE_RANGE,
                },
                {
                    title: 'Діагноз',
                    key: 'fullDiagnosis',
                },
            ],
        },
    ],
    sorts: {
        fullName : {
            [SortOrder.DESC]: 'Я-А',
            [SortOrder.ASC]: 'А-Я',
        },
        rank: {
            [SortOrder.DESC]: 'Від вищого',
            [SortOrder.ASC]: 'Від нижчого',
        },
        birthDate: {
            [SortOrder.DESC]: 'Від старших',
            [SortOrder.ASC]: 'Від молодших',
        },
        recordsLength: {
            [SortOrder.DESC]: 'Від більшої кількості',
            [SortOrder.ASC]: 'Від меншої кількості',
        },
        recordDate: {
            [SortOrder.DESC]: 'Від нових звернень',
            [SortOrder.ASC]: 'Від давніх звернень',
        },
    },
};

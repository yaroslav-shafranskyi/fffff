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
        accessor: p => p.records.brief.length,
        key: 'recordsLength',
    },
    {
        title: 'Крайнє звернення',
        render: p => formatDate(p.getValue() as Date) ?? '',
        accessor: p => p.lastRecords?.brief?.date,
        key: 'lastRecordDate',
    },
    {
        title: 'Крайній діагноз',
        render: p => p.getValue() as string,
        accessor: p => p.lastRecords?.brief?.fullDiagnosis ?? '',
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
                    type: TableFilterType.DATE_RANGE,
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
                    type: TableFilterType.RANGE,
                    range: {
                        min: 0,
                        max: 100,
                    },
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
            [SortOrder.DESC]: {
                optionTitle: 'Я-А',
                infoTitle: 'ПІБ: Я-А'
            },
            [SortOrder.ASC]: {
                optionTitle: 'А-Я',
                infoTitle: 'ПІБ: А-Я'
            },
        },
        rank: {
            [SortOrder.DESC]: {
                optionTitle: 'Від вищого звання',
            },
            [SortOrder.ASC]: {
                optionTitle: 'Від нижчого звання',
            },
        },
        birthDate: {
            [SortOrder.DESC]: {
                optionTitle: 'Від старших',
            },
            [SortOrder.ASC]: {
                optionTitle: 'Від молодших',
            },
        },
        recordsLength: {
            [SortOrder.DESC]: {
                optionTitle: 'Від більшої кількості',
                infoTitle: 'Від більшої кількості звернень',
            },
            [SortOrder.ASC]: {
                optionTitle: 'Від меншої кількості',
                infoTitle: 'Від меншої кількості звернень',
            },
        },
        recordDate: {
            [SortOrder.DESC]: {
                optionTitle: 'Від нових звернень',
            },
            [SortOrder.ASC]: {
                optionTitle: 'Від давніх звернень',
            },
        },
    },
};

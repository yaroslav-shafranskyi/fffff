import { Gender, IUserBriefRecord } from "../../api";
import { convertNullOrNumberToDate, formatDate } from "../../helpers";
import { SortOrder } from "../../interfaces";
import { IColumn, IQueryData, TableFilterType } from "../../shared";

export const columns: IColumn<IUserBriefRecord>[] = [
  {
    title: "Тип",
    render: (p) => p.getValue() as string,
    key: "type",
  },
  {
    title: "ПІБ",
    render: (p) => p.getValue() as string,
    key: "fullName",
  },
  {
    title: "Звання",
    render: (p) => p.getValue() as string,
    key: "rank",
  },
  {
    title: "Посвідчення особи",
    render: (p) => p.getValue() as string,
    key: "personalId",
  },
  {
    title: "Дата народження",
    render: (p) =>
      !p.getValue()
        ? ""
        : formatDate(convertNullOrNumberToDate(p.getValue() as number)),
    key: "birthDate",
  },
  {
    title: "Стать",
    render: (p) =>
      !p.getValue() ? "" : (p.getValue() as string).toLowerCase() + ".",
    key: "gender",
  },
  {
    title: "Військова частина",
    render: (p) => p.getValue() as string,
    key: "militaryBase",
  },
  {
    title: "Дата",
    render: (p) =>
      !p.getValue()
        ? ""
        : formatDate(convertNullOrNumberToDate(p.getValue() as number)),
    key: "date",
  },
  {
    title: "Діагноз",
    render: (p) => p.getValue() as string,
    key: "fullDiagnosis",
  },
];

export const queryData: IQueryData = {
  globalFilter: {
    key: "Any",
    placeholder: "Впишіть ПІБ або діагноз...",
  },
  filters: [
    {
      title: "Особиста інформація:",
      fields: [
        {
          key: "fullName",
          title: "ПІБ",
        },
        {
          key: "rank",
          title: "Звання",
        },
        {
          key: "personalId",
          title: "Посвідчення особи",
        },
        {
          key: "birthDate",
          title: "Дата народження",
          type: TableFilterType.DATE_RANGE,
        },
        {
          key: "gender",
          title: "Стать",
          options: [Gender.MALE, Gender.FEMALE],
        },
        {
          title: "Військова частина",
          key: "militaryBase",
        },
      ],
    },
    {
      title: "Звернення:",
      fields: [
        {
          title: "Дата звернення",
          key: "recordDate",
          type: TableFilterType.DATE_RANGE,
        },
        {
          title: "Діагноз",
          key: "fullDiagnosis",
        },
      ],
    },
  ],
  sorts: {
    fullName: {
      [SortOrder.DESC]: {
        optionTitle: "Я-А",
        infoTitle: "ПІБ: Я-А",
      },
      [SortOrder.ASC]: {
        optionTitle: "А-Я",
        infoTitle: "ПІБ: А-Я",
      },
    },
    rank: {
      [SortOrder.DESC]: {
        optionTitle: "Від вищого звання",
      },
      [SortOrder.ASC]: {
        optionTitle: "Від нижчого звання",
      },
    },
    birthDate: {
      [SortOrder.DESC]: {
        optionTitle: "Від старших",
      },
      [SortOrder.ASC]: {
        optionTitle: "Від молодших",
      },
    },
    recordDate: {
      [SortOrder.DESC]: {
        optionTitle: "Від нових звернень",
      },
      [SortOrder.ASC]: {
        optionTitle: "Від давніх звернень",
      },
    },
  },
};

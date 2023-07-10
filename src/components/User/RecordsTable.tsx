import { FC, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RowData } from "@tanstack/react-table";

import { IUserBriefRecord, useQueryUserRecords } from "../../api";
import { Table } from "../../shared";
import { getInitialQuery } from "../../constants";
import { IQuery } from "../../interfaces";

import { columns, queryData } from "./constants";
import { getFormUrlByType } from "../../helpers";

export const RecordsTable: FC = () => {
  const [query, setQuery] = useState<IQuery<IUserBriefRecord>>(
    getInitialQuery()
  );

  const navigate = useNavigate();

  const { records, total } = useQueryUserRecords(query);

  const goBack = () => {
    navigate("/");
  };

  const goToForm = useCallback((row: RowData) => () => {
    const { personId, type, formId } = (row as { original: IUserBriefRecord }).original;

    const formUrl = getFormUrlByType(type);
    if (!formUrl) {
      return;
    }
    navigate(`${formUrl}/${personId}/${formId}`);
  }, [navigate])

  return (
    <Table<IUserBriefRecord>
      data={records}
      columns={columns}
      query={query}
      queryData={queryData}
      total={total}
      size='small'
      title="Заповнені документи"
      goBack={goBack}
      onQueryChange={setQuery}
      onRowClick={goToForm}
    />
  );
};

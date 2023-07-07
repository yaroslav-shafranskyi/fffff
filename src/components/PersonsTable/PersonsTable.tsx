import { FC, useState } from "react";
import { Container } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { RowData } from "@tanstack/react-table";

import { IPersonBrief, useQueryPersons } from "../../api";
import { Table } from "../../shared";
import { getInitialQuery } from "../../constants";
import { IQuery } from "../../interfaces";

import { containerStyles } from "./styles";
import { columns, queryData } from "./constants";

export const PersonsTable: FC = () => {
  const [query, setQuery] = useState<IQuery<IPersonBrief>>(getInitialQuery());

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { persons, total } = useQueryPersons(query);

  const goBack = () => {
    navigate("/");
  };

  const goToPerson = (row: RowData) => () => {
    const { id } = (row as { original: IPersonBrief }).original;
    navigate(`${pathname}/${decodeURI(String(id))}`);
  };

  return (
    <Container maxWidth={false} sx={containerStyles}>
      <Table<IPersonBrief>
        data={persons}
        columns={columns}
        query={query}
        queryData={queryData}
        total={total}
        title="Перелік поранених військовослужбовців"
        goBack={goBack}
        onQueryChange={setQuery}
        onRowClick={goToPerson}
      />
    </Container>
  );
};

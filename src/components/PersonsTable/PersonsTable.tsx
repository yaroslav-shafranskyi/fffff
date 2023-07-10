import { FC, useEffect, useState } from "react";
import { Container } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { RowData } from "@tanstack/react-table";

import { IPersonBrief, UserType, useGetUser, useQueryPersons } from "../../api";
import { Table } from "../../shared";
import { getInitialQuery } from "../../constants";
import { IQuery } from "../../interfaces";

import { containerStyles } from "./styles";
import { columns, queryData } from "./constants";

export const PersonsTable: FC = () => {
  const [query, setQuery] = useState<IQuery<IPersonBrief>>(getInitialQuery());

  const { militaryBase, role } = useGetUser();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { persons, total } = useQueryPersons(query);

  useEffect(() => {
    if (role !== UserType.SUPER_ADMIN && militaryBase) {
      setQuery((prevQuery) => ({
        ...prevQuery,
        filterBy: { ...prevQuery.filterBy, militaryBase },
      }));
    }
  }, [militaryBase, role]);

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

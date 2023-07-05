import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import {
  IPerson,
  useCreatePerson,
  useGetPerson,
  useUpdatePerson,
} from "../../api";
import { PersonPage } from "./PersonPage";
import { personsUrl } from "../../constants";

export const PersonComponent = () => {
  const { pathname } = useLocation() ?? {};

  const personId = useMemo(
    () => decodeURI(pathname?.split("/persons/")?.[1]),
    [pathname]
  );

  const queryClient = useQueryClient();

  const { person } = useGetPerson(personId);
  const { mutate: updatePerson } = useUpdatePerson({
    onSuccess: () => {
      queryClient.removeQueries([personsUrl]);
    },
  });
  const { mutate: createPerson } = useCreatePerson();

  const submitUserChanges = ({ id, ...newPerson }: IPerson) => {
    if (personId === "create") {
      createPerson(newPerson);
      return;
    }
    updatePerson({ id, ...newPerson });
  };

  return <PersonPage person={person} onSubmit={submitUserChanges} />;
};

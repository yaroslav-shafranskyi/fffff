import { QueryClient } from "@tanstack/react-query";

import { personsUrl, briefsUrl } from "../../constants";

export const removeQueriesAfterFormSaving = (queryClient: QueryClient) => {
  queryClient.removeQueries([personsUrl]);
  queryClient.removeQueries([briefsUrl]);
};

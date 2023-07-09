import { useCallback } from "react";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

import { serviceUrl, userUrl } from "../../constants";
import { http } from "../../helpers";

import { queryUsersQueryKey } from "./constants";

export const useDeleteUser = (
  options?: UseMutationOptions<unknown, unknown, number>
) => {
  const queryClient = useQueryClient();

  const handleSuccess = useCallback(
    (res: unknown, vars: number, context: unknown) => {
      options?.onSuccess?.(res, vars, context);
      queryClient.removeQueries(queryUsersQueryKey);
    },
    [options, queryClient]
  );

  return useMutation(
    (id) => http.post(`${serviceUrl}${userUrl}/delete`, { id }),
    {
      ...options,
      onSuccess: handleSuccess,
    }
  );
};

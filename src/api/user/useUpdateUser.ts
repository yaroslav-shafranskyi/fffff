import { useCallback } from "react";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

import { serviceUrl, updateUrl, userUrl } from "../../constants";
import { http } from "../../helpers";

import { IUser } from "../IUser";

import { queryUsersQueryKey } from "./constants";

export const useUpdateUser = (
  options?: UseMutationOptions<unknown, unknown, Partial<IUser>>
) => {
  const queryClient = useQueryClient();
  const handleSuccess = useCallback(
    (res: unknown, vars: Partial<IUser>, context: unknown) => {
      options?.onSuccess?.(res, vars, context);
      queryClient.removeQueries(queryUsersQueryKey);
    },
    [options, queryClient]
  );
  return useMutation(
    (user) => http.post(`${serviceUrl}${userUrl}${updateUrl}`, user),
    { ...options, onSuccess: handleSuccess }
  );
};

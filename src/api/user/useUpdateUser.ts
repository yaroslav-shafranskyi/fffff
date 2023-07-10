import { useCallback } from "react";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

import { loginUrl, serviceUrl, updateUrl, userUrl } from "../../constants";
import { http } from "../../helpers";

import { IUserBrief } from "../IUser";

import { queryUsersQueryKey } from "./constants";

export const useUpdateUser = (
  options?: UseMutationOptions<unknown, unknown, IUserBrief>
) => {
  const queryClient = useQueryClient();
  const handleSuccess = useCallback(
    (res: unknown, vars: IUserBrief, context: unknown) => {
      options?.onSuccess?.(res, vars, context);
      queryClient.removeQueries(queryUsersQueryKey);
    },
    [options, queryClient]
  );
  return useMutation(
    (user) => {
      queryClient.setQueryData([loginUrl], user);
      return http.post(`${serviceUrl}${userUrl}${updateUrl}`, user);
    },
    { ...options, onSuccess: handleSuccess }
  );
};

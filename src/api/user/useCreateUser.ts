import { useCallback } from "react";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

import { serviceUrl, createUrl, userUrl } from "../../constants";
import { http } from "../../helpers";

import { IUser } from "../IUser";

import { queryUsersQueryKey } from "./constants";

export type CreateUserPayload = Pick<IUser, "user" | "role">;

export const useCreateUser = (
  options?: UseMutationOptions<unknown, unknown, CreateUserPayload>
) => {
  const queryClient = useQueryClient();
  const handleSuccess = useCallback(
    (res: unknown, vars: CreateUserPayload, context: unknown) => {
      options?.onSuccess?.(res, vars, context);
      queryClient.removeQueries(queryUsersQueryKey);
    },
    [options, queryClient]
  );
  return useMutation(
    (data) => http.post(`${serviceUrl}${userUrl}${createUrl}`, data),
    { ...options, onSuccess: handleSuccess }
  );
};

import { useCallback } from "react";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

import { http } from "../../helpers";
import { loginUrl, serviceUrl } from "../../constants";

import { IUserBrief } from "../IUser";
import { IAuthorizationRequest } from "../Permissions";

export const useLogin = (
  options?: UseMutationOptions<unknown, unknown, IAuthorizationRequest>
) => {
  const queryClient = useQueryClient();
  const handleSuccess = useCallback(
    (res: unknown, vars: IAuthorizationRequest, context: unknown) => {
      const data = res as IUserBrief;
      queryClient.setQueryData([loginUrl], data);
      options?.onSuccess?.(res, vars, context);
    },
    [options, queryClient]
  );

  return useMutation(
    (request) => http.post(`${serviceUrl}${loginUrl}`, request),
    { ...options, onSuccess: handleSuccess }
  );
};

import { useCallback } from "react";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

import { IAuthorizationRequest, IAuthorizationResponse } from "../Permissions";
import { http } from "../../helpers";
import { loginUrl, serviceUrl } from "../../constants";

export const useLogin = (
  options?: UseMutationOptions<unknown, unknown, IAuthorizationRequest>
) => {
  const queryClient = useQueryClient();
  const handleSuccess = useCallback(
    (res: unknown, vars: IAuthorizationRequest, context: unknown) => {
      const data = res as IAuthorizationResponse;
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

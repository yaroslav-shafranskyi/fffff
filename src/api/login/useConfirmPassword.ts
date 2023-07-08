import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { IAuthorizationRequest } from "../Permissions";
import { http } from "../../helpers";
import { loginUrl, serviceUrl } from "../../constants";

export const useConfirmPassword = (
  options?: UseMutationOptions<unknown, unknown, IAuthorizationRequest>
) =>
  useMutation(
    (request) => http.post(`${serviceUrl}${loginUrl}/confirm`, request),
    options
  );

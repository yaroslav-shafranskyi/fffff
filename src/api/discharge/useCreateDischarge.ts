import { UseMutationOptions, useMutation } from "@tanstack/react-query";

import { IDischarge } from "../../api";
import { serviceUrl, createUrl, dischargeUrl } from "../../constants";

import { http } from "../../helpers";

export const useCreateDischarge = (
  options?: UseMutationOptions<unknown, unknown, Omit<IDischarge, "id">>
) =>
  useMutation(
    (discharge) =>
      http.post(`${serviceUrl}${dischargeUrl}${createUrl}`, discharge),
    options
  );

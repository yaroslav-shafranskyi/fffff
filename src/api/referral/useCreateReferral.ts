import { UseMutationOptions, useMutation } from "@tanstack/react-query";

import { IReferral } from "../../api";
import { serviceUrl, createUrl, referralUrl } from "../../constants";

import { http } from "../../helpers";

export const useCreateReferral = (
  options?: UseMutationOptions<unknown, unknown, Omit<IReferral, "id">>
) =>
  useMutation(
    (referral) =>
      http.post(`${serviceUrl}${referralUrl}${createUrl}`, referral),
    options
  );

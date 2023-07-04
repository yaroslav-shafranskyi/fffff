import { UseMutationOptions, useMutation } from "@tanstack/react-query";

import { IForm100 } from "../../api";
import { serviceUrl, createUrl, form100Url } from "../../constants";

import { http } from "../../helpers";

export const useCreateForm100 = (
  options?: UseMutationOptions<unknown, unknown, Omit<IForm100, "id">>
) =>
  useMutation(
    (form100) => http.post(`${serviceUrl}${form100Url}${createUrl}`, form100),
    options
  );

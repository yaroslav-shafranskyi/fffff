import { UseMutationOptions, useMutation } from "@tanstack/react-query";

import { IForm100 } from "../../api";
import { serviceUrl, updateUrl, form100Url } from "../../constants";
import { http } from "../../helpers";

export const useUpdateForm100 = (
  options?: UseMutationOptions<unknown, unknown, IForm100>
) =>
  useMutation(
    (form) => http.post(`${serviceUrl}${form100Url}${updateUrl}`, form),
    options
  );

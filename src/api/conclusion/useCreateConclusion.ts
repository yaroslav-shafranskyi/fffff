import { UseMutationOptions, useMutation } from "@tanstack/react-query";

import { IConclusion } from "../../api";
import { serviceUrl, createUrl, conclusionUrl } from "../../constants";

import { http } from "../../helpers";

export const useCreateConclusion = (
  options?: UseMutationOptions<unknown, unknown, IConclusion>
) =>
  useMutation(
    // id will be generated on backend
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ({ id, ...conclusion }) =>
      http.post(`${serviceUrl}${conclusionUrl}${createUrl}`, conclusion),
    options
  );

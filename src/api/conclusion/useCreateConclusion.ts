import { UseMutationOptions, useMutation } from "@tanstack/react-query";

import { IConclusion } from "../../api";
import { serviceUrl, createUrl, conclusionUrl } from "../../constants";

import { http } from "../../helpers";

export const useCreateConclusion = (
  options?: UseMutationOptions<unknown, unknown, Omit<IConclusion, "id">>
) =>
  useMutation(
    (conclusion) =>
      http.post(`${serviceUrl}${conclusionUrl}${createUrl}`, conclusion),
    options
  );

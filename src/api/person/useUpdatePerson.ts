import { UseMutationOptions, useMutation } from "@tanstack/react-query";

import { IPerson } from '../../api';
import { serviceUrl, personsUrl, updateUrl } from "../../constants";
import { http } from '../../helpers';

export const useUpdatePerson = (options?: UseMutationOptions<unknown, unknown, IPerson>) =>
    useMutation((person) => http.post(`${serviceUrl}${personsUrl}${updateUrl}`, person), options);

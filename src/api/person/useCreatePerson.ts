import { UseMutationOptions, useMutation } from "@tanstack/react-query";

import { IPerson } from '../../api';
import { serviceUrl, personsUrl, createUrl } from "../../constants";

import { http } from '../../helpers';

export const useCreatePerson = (options?: UseMutationOptions<unknown, unknown, Omit<IPerson, 'id'>>) =>
    useMutation((person) => http.post(`${serviceUrl}${personsUrl}${createUrl}`, person), options);

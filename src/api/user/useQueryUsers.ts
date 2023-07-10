import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { http } from "../../helpers";
import { serviceUrl, userUrl } from "../../constants";

import { IUser } from "../IUser";
import { useGetUser } from "../user";

import { queryUsersQueryKey } from "./constants";

type QueryUsersType = Pick<
  IUser,
  "id" | "user" | "fullName" | "militaryBase" | "position" | "role"
>[];

const emptyArray: [] = [];

export const useQueryUsers = (
  queryString?: string,
  options?: UseQueryOptions<QueryUsersType>
) => {
  const { user: currentUser } = useGetUser();

  const queryFn = () =>
    http.post(`${serviceUrl}${userUrl}/query`, {
      queryString,
      currentUser,
    }) as unknown as QueryUsersType;

  const res = useQuery<QueryUsersType>(
    [...queryUsersQueryKey, queryString],
    queryFn,
    options
  );

  return {
    ...res,
    users: res.data ?? emptyArray,
  };
};

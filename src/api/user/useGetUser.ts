import { useQueryClient, useQuery } from "@tanstack/react-query";

import { loginUrl, defaultUserData } from "../../constants";

import { IUserBrief } from "../IUser";

const staleTime = 5 * 60 * 1000;

export const useGetUser = () => {
  const queryClient = useQueryClient();

  const queryFn = () =>
    queryClient.getQueryData<IUserBrief>([loginUrl]) ?? defaultUserData;

  const res = useQuery([loginUrl], queryFn, {
    staleTime,
  });

  return res.data ?? defaultUserData;
};

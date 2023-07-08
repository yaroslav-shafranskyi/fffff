import { useQueryClient, useQuery } from "@tanstack/react-query";

import { loginUrl } from "../../constants";
import { IAuthorizationResponse, UserType } from "../Permissions";

const noPerms: IAuthorizationResponse = { user: '', role: UserType.NONE };

const staleTime = 5 * 60 * 1000;

export const useGetPermissions = () => {
  const queryClient = useQueryClient();

  const queryFn = () =>
    queryClient.getQueryData<IAuthorizationResponse>([loginUrl]) ?? noPerms;

  const res = useQuery([loginUrl], queryFn, {
    staleTime,
  });

  return res.data ?? noPerms;
};

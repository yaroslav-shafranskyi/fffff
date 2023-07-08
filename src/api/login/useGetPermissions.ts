import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { loginUrl } from "../../constants";
import { IAuthorizationResponse, UserType } from "../Permissions";

const noPerms: IAuthorizationResponse = { role: UserType.NONE };

export const useGetPermissions = () => {
  const queryClient = useQueryClient();

  const data = useMemo(
    () =>
      queryClient.getQueryData<IAuthorizationResponse>([loginUrl]) ?? noPerms,
    [queryClient]
  );

  return data;
};

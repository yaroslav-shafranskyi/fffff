import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { getUrl, loginUrl, serviceUrl, userUrl } from "../../constants";
import { http } from "../../helpers";

import { UserType } from "../Permissions";
import { useGetPermissions } from "../login";
import { IUser } from "../IUser";

const emptyUser: Omit<IUser, "password"> = {
  user: "",
  role: UserType.NONE,
  id: undefined as unknown as number,
};

const staleTime = 5 * 60 * 1000;

export const useGetUser = (options?: UseQueryOptions<IUser>) => {
  const { user: currentUser } = useGetPermissions();

  const data =
    options?.enabled === false
      ? {}
      : {
          user: currentUser,
          password: !currentUser
            ? prompt("Підтвердіть свій пароль")
            : undefined,
        };

  const queryFn = () =>
    http.post(`${serviceUrl}${userUrl}${getUrl}`, data) as unknown as IUser;

  const res = useQuery<IUser>([loginUrl], queryFn, {
    staleTime,
    ...options,
  });

  return {
    ...res,
    user: res.data ?? emptyUser,
  };
};

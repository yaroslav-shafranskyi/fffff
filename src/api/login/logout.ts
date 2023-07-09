import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { loginUrl } from "../../constants";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return () => {
    queryClient.removeQueries([loginUrl]);
    navigate(loginUrl)
  };
};

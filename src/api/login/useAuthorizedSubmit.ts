import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { loginUrl } from "../../constants";

import { useGetUser } from "../user";

import { useConfirmPassword } from "./useConfirmPassword";

const emptyArray: [] = [];

export const useAuthorizedSubmit = <T>(
  cb: (...args: T[]) => void,
  args?: T[]
) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { mutate: confirmPassword } = useConfirmPassword({
    onSuccess: (res) => {
      if (res) {
        cb(...(args ?? emptyArray));
      }
      if (!res) {
        alert("Неправильний пароль!");
      }
    },
  });

  const { user } = useGetUser();

  const handleSubmit = useCallback(() => {
    if (!user) {
      navigate(loginUrl, { state: { prevPath: pathname } });
      return;
    }
    const password = prompt("Підтвердіть пароль");
    if (password === null) {
      return;
    }
    confirmPassword({
      user,
      password,
    });
  }, [confirmPassword, navigate, pathname, user]);

  return handleSubmit;
};

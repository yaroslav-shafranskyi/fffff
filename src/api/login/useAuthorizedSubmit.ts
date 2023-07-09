import { useCallback } from "react";

import { useConfirmPassword } from "./useConfirmPassword";
import { useGetPermissions } from "./useGetPermissions";

const emptyArray: [] = [];

export const useAuthorizedSubmit = <T>(
  cb: (...args: T[]) => void,
  args?: T[]
) => {
  const { user } = useGetPermissions();

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

  const handleSubmit = useCallback(() => {
    const password = prompt("Підтвердіть пароль");
    if (password === null) {
      return;
    }
    confirmPassword({
      user,
      password,
    });
  }, [confirmPassword, user]);

  return handleSubmit;
};

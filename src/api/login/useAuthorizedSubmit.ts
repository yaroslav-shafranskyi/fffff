import { useCallback } from "react";

import { useConfirmPassword } from "./useConfirmPassword";
import { useGetPermissions } from "./useGetPermissions";

export const useAuthorizedSubmit = (cb: VoidFunction) => {
  const { user } = useGetPermissions();

  const { mutate: confirmPassword } = useConfirmPassword({
    onSuccess: (res) => {
      if (res) {
        cb();
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

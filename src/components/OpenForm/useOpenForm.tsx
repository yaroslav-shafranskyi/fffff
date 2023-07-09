import { useCallback, useState } from "react";

import { UseOpenFormComponentType } from "../../interfaces";

export const useOpenFormDialog = <T,>(
  Component: UseOpenFormComponentType<T>
) => {
  const [open, setOpen] = useState<boolean>(false);
  const [componentProps, setComponentProps] = useState<T>({} as T);

  const handleOpen = useCallback((data?: T) => {
    setComponentProps(data ?? {} as T);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const node = open && <Component onClose={handleClose} {...componentProps} />;

  return [node, handleOpen] as const;
};

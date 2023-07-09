import { FC } from "react";

export type UseOpenFormComponentType<T = object> = FC<
  T & { onClose: () => void }
>;

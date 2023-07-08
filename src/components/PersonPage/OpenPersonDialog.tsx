import { useCallback } from "react";

import { UseOpenFormComponentType } from "../../interfaces";
import { personsUrl } from "../../constants";
import { IPerson, useGetPermissions } from "../../api";

import { OpenFormDialog } from "../OpenForm";

export const OpenPersonDialog: UseOpenFormComponentType = ({ onClose }) => {
  const { militaryBase } = useGetPermissions();

  const goToUpdateMode = useCallback(
    (person?: IPerson) => {
      if (!person) {
        return {};
      }
      const readonly = !!militaryBase && militaryBase !== person?.militaryBase;
      return {
        url: `${personsUrl}/${person.id}`,
        readonly,
      };
    },
    [militaryBase]
  );

  const goToCreateMode = useCallback(
    () => ({
      url: `${personsUrl}/create`,
    }),
    []
  );

  const title =
    "Ви бажаєте внести інформацію про нового військовослужбовця чи переглянути вже існуючого?";

  return (
    <OpenFormDialog
      title={title}
      goToUpdateMode={goToUpdateMode}
      goToCreateMode={goToCreateMode}
      onClose={onClose}
    />
  );
};

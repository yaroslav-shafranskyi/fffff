import { useCallback } from "react";

import { UseOpenFormComponentType } from "../../interfaces";
import { form100Url } from "../../constants";
import { IPerson } from "../../api";

import { OpenFormDialog } from "../OpenForm";

export const OpenForm100Dialog: UseOpenFormComponentType = ({ onClose }) => {
  const goToUpdateMode = useCallback((person?: IPerson) => {
    if (!person) {
      return {};
    }
    const lastForm100Id = person.lastRecords.form100;
    if (!lastForm100Id) {
      return {
        error: "По цьому військовослужбовцю немає збережених Форм 100.",
      };
    }
    const url = `${form100Url}/${person.id}/${lastForm100Id}`;
    return { url, state: { readonly: true } };
  }, []);

  const goToCreateMode = useCallback((personId?: number) => {
    const url = !personId
      ? `${form100Url}/create`
      : `${form100Url}/${personId}/create`;
    return { url };
  }, []);

  const title = "Ви бажаєте створити нову Форму 100 чи переглянути існуючу?";

  return (
    <OpenFormDialog
      title={title}
      goToUpdateMode={goToUpdateMode}
      goToCreateMode={goToCreateMode}
      onClose={onClose}
    />
  );
};

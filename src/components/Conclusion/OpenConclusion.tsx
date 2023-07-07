import { useCallback } from "react";

import { UseOpenFormComponentType } from "../../interfaces";
import { conclusionUrl } from "../../constants";
import { IPerson } from "../../api";

import { OpenFormDialog } from "../OpenForm";

export const OpenConclusionForm: UseOpenFormComponentType = ({ onClose }) => {
  const goToViewMode = useCallback((person?: IPerson) => {
    if (!person) {
      return {};
    }
    const lastConclusionId = person.lastRecords.conclusion;
    if (!lastConclusionId) {
      return {
        error:
          "По цьому військовослужбовцю немає збережених консультаційних висновків.",
      };
    }
    return {
      url: `${conclusionUrl}/${person.id}/${lastConclusionId}`,
      state: { readonly: true },
    };
  }, []);

  const goToCreateMode = useCallback((personId?: number) => {
    const url = !personId
      ? `${conclusionUrl}/create`
      : `${conclusionUrl}/${personId}/create`;
    return { url };
  }, []);

  const title =
    "Ви бажаєте створити новий консультаційний висновок чи переглянути існуючий?";

  return (
    <OpenFormDialog
      title={title}
      goToUpdateMode={goToViewMode}
      goToCreateMode={goToCreateMode}
      onClose={onClose}
    />
  );
};

import { useCallback } from "react";

import { UseOpenFormComponentType } from "../../interfaces";
import { dischargeUrl } from "../../constants";
import { IPerson } from "../../api";

import { OpenFormDialog } from "../OpenForm";

export const OpenDischargeForm: UseOpenFormComponentType = ({ onClose }) => {
  const goToUpdateMode = useCallback(
    (person?: IPerson) => {
      if (!person) {
        return {};
      }
      const lastDischargeId = person.lastRecords.discharge;
      if (!lastDischargeId) {
        return {
          error: "По цьому військовослужбовцю немає збережених виписок.",
        };
      }
      return {
        url: `${dischargeUrl}/${person.id}/${lastDischargeId}`,
        state: { readonly: true },
      };
    },
    []
  );

  const goToCreateMode = useCallback(
    (personId?: number) => {
      const url = !personId
        ? `${dischargeUrl}/create`
        : `${dischargeUrl}/${personId}/create`;
      return { url };
    },
    []
  );

  const title = "Ви бажаєте створити нову виписку чи переглянути існуючу?";

  return (
    <OpenFormDialog
      title={title}
      goToUpdateMode={goToUpdateMode}
      goToCreateMode={goToCreateMode}
      onClose={onClose}
    />
  );
};

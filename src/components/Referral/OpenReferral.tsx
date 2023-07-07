import { useCallback } from "react";

import { UseOpenFormComponentType } from "../../interfaces";
import { referralUrl } from "../../constants";
import { IPerson } from "../../api";

import { OpenFormDialog } from "../OpenForm";

export const OpenReferralForm: UseOpenFormComponentType = ({ onClose }) => {
  const goToUpdateMode = useCallback((person?: IPerson) => {
    if (!person) {
      return {};
    }
    const lastReferralId = person.lastRecords.referral;
    if (!lastReferralId) {
      return {
        error: "По цьому військовослужбовцю немає збережених направлень.",
      };
    }
    return {
      url: `${referralUrl}/${person.id}/${lastReferralId}`,
      state: { readonly: true },
    };
  }, []);

  const goToCreateMode = useCallback((personId?: number) => {
    const url = !personId
      ? `${referralUrl}/create`
      : `${referralUrl}/${personId}/create`;
    return { url };
  }, []);

  const title = "Ви бажаєте створити нове направлення чи переглянути існуюче?";

  return (
    <OpenFormDialog
      title={title}
      goToUpdateMode={goToUpdateMode}
      goToCreateMode={goToCreateMode}
      onClose={onClose}
    />
  );
};

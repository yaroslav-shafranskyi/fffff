import { Forms } from "../../api";
import {
  form100Url,
  dischargeUrl,
  referralUrl,
  conclusionUrl,
} from "../../constants";

export const getFormUrlByType = (type: Forms): string | undefined => {
  if (type === Forms.FORM_100) {
    return form100Url;
  }
  if (type === Forms.DISCHARGE) {
    return dischargeUrl;
  }
  if (type === Forms.REFERRAL) {
    return referralUrl;
  }
  if (type === Forms.CONCLUSION) {
    return conclusionUrl;
  }
};

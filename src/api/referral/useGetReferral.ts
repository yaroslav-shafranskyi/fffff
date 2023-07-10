import { useMemo } from "react";
import { QueryKey, UseQueryOptions, useQuery } from "@tanstack/react-query";

import {
  serviceUrl,
  getUrl,
  referralUrl,
  defaultReferralData,
} from "../../constants";
import { IReferral, useGetUser } from "../../api";
import { http } from "../../helpers";

export const useGetReferral = (
  personId: string,
  id: string,
  options?: UseQueryOptions<IReferral>
) => {
  const { id: doctorId } = useGetUser();

  const queryKey: QueryKey = useMemo(
    () => [referralUrl, personId, id, doctorId],
    [personId, id, doctorId]
  );

  const queryFunction = () =>
    http.post(`${serviceUrl}${referralUrl}${getUrl}`, {
      id,
      personId,
      doctorId
    }) as unknown as IReferral;

  const res = useQuery<IReferral>(queryKey, queryFunction, options);

  return {
    ...res,
    referral: {
      ...defaultReferralData,
      ...res?.data,
    },
  };
};

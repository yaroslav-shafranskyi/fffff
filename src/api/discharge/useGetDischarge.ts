import { useQueryClient } from "@tanstack/react-query";

import { IDischarge } from "../IDischarge";
import { defaultDischargeBackPageState, defaultDischargeFrontPageState } from "../../constants";

export const useGetDischarge = (personId: string, dischargeId: string) => {
    const queryClient = useQueryClient();

    const data = queryClient.getQueryData<IDischarge>(['discharge', personId, dischargeId]);

    return data ?? { ...defaultDischargeBackPageState, ...defaultDischargeFrontPageState };
};

import { EvacuationClinic } from "../../api";

import { MappingFieldsTypes } from "../../interfaces";

export const evacuationClinicFieldNames: MappingFieldsTypes<Record<string, keyof EvacuationClinic>> = {
    0: {
        name: EvacuationClinic.MPP,
        fieldName: 'MPP',
    },
    1: {
        name: EvacuationClinic.VMH,
        fieldName: 'VMH',
    },
    2: {
        name: EvacuationClinic.VH,
        fieldName: 'VH',
    },
    3: {
        name: EvacuationClinic.VMKC,
        fieldName: 'VMKC',
    },
    4: {
        name: EvacuationClinic.CIVIL,
        fieldName: 'CIVIL',
    },
};

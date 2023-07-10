import { IReferral, PositionWithName } from "../../api";

export const defaultPositionWithName: PositionWithName = {
    position: '',
    fullName: '',
};

export const defaultReferralData: IReferral = {
    militaryBase: '',
    code: '',
    date: undefined as unknown as number,
    militaryBaseAddress: '',
    number: '',
    receiver: '',
    patient: '',
    diagnosis: '',
    commander: defaultPositionWithName,
    medicalCommander: defaultPositionWithName,
    id: -1,
    personId: -1,
    doctorId: -1,
};

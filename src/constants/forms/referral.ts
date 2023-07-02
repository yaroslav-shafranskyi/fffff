import { IReferral, PositionWithName } from "../../api";

export const defaultPositionWithName: PositionWithName = {
    position: '',
    fullName: '',
};

export const defaultReferralData: IReferral = {
    militaryBase: '',
    code: '',
    date: undefined as unknown as Date,
    militaryBaseAddress: '',
    number: '',
    receiver: '',
    patient: '',
    diagnosis: '',
    commander: defaultPositionWithName,
    medicalCommander: defaultPositionWithName,
    // TODO: id should be incrementally generated on back-end
    id: String(Date.now()),
    personId: String(Math.round(Math.random() * 1000000)),
};

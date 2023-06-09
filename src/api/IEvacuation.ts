export enum EvacuationType {
    LAY = 'лежачи',
    SIT = 'сидячи'
}

export enum EvacuationClinic {
    MPP = 'МПП Мед. Р',
    VMH = 'ВМГ лікарні',
    VH = 'ВГ',
    VMKC = 'ВМКЦ',
    CIVIL = 'Цив. заклад'
}

export type EvacuationPriority = 'I' | 'II' | 'III';

export enum EvacuationTransport {
    TRUCK = 'Truck',
    CAR = 'Car',
    SHIP = 'Ship',
    HELICOPTER = 'Helicopter',
    PLANE = 'Plane'
}

export interface IEvacuation {
    type: EvacuationType;
    clinic: EvacuationClinic;
    priority: EvacuationPriority;
    transport: EvacuationTransport;
}

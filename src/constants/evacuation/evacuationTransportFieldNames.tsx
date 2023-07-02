import { EvacuationTransport } from "../../api";
import { CarIcon, HelicopterIcon, PlaneIcon, ShipIcon, TruckIcon } from "../../assets";

export const evacuationTransportFields: Record<number, { name: EvacuationTransport, icon: JSX.Element }> = {
    0: {
        name: EvacuationTransport.TRUCK,
        icon: <TruckIcon />,
    },
    1: {
        name: EvacuationTransport.CAR,
        icon: <CarIcon />,
    },
    2: {
        name: EvacuationTransport.SHIP,
        icon: <ShipIcon />,
    },
    3: {
        name: EvacuationTransport.HELICOPTER,
        icon: <HelicopterIcon />,
    },
    4: {
        name: EvacuationTransport.PLANE,
        icon: <PlaneIcon />,
    },
};

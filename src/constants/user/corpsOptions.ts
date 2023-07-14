import {
  CorpsType,
  ArmyCorpsType,
  AircraftCorpsType,
  NavalCorpsType,
  LandingCorpsType,
  SupportCorpsType,
} from "../../api";

export const corpsOptions = [
  ...Object.values(ArmyCorpsType).map((ct) => ({
    label: ct,
    group: CorpsType.ARMY,
  })),
  ...Object.values(AircraftCorpsType).map((ct) => ({
    label: ct,
    group: CorpsType.AIRCRAFT,
  })),
  ...Object.values(NavalCorpsType).map((ct) => ({
    label: ct,
    group: CorpsType.NAVAL,
  })),
  ...Object.values(LandingCorpsType).map((ct) => ({
    label: ct,
    group: CorpsType.LANDING,
  })),
  ...Object.values(SupportCorpsType).map((ct) => ({
    label: ct,
    group: CorpsType.SUPPORT,
  })),
];

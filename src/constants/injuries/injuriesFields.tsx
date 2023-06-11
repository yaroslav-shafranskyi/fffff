import { InjuryFieldType } from "../../api";

import { FireArmIcon,
    BiologicalIcon,
    ChemicalsIcon,
    IllnessIcon,
    InfectionIcon,
    MechanicalInjuryIcon,
    OtherWeaponIcon,
    NuclearIcon,
    ReactiveIcon,
    ThermalIcon
} from "./icons"

export const injuriesFields: InjuryFieldType = {
    0: {
        name: 'Вогн',
        icon: <FireArmIcon />,
        fieldName: 'firearm',
    },
    1: {
        name: 'Я',
        icon: <NuclearIcon />,
        fieldName: 'nuclear',
    },
    2: {
        name: 'Хім',
        icon: <ChemicalsIcon />,
        fieldName: 'chemical',
    },
    3: {
        name: 'Біол',
        icon: <BiologicalIcon />,
        fieldName: 'biological',
    },
    4: {
        name: 'Інш. збр',
        icon: <OtherWeaponIcon />,
        fieldName: 'other',
    },
    5: {
        name: 'Терм',
        icon: <ThermalIcon />,
        fieldName: 'hypothermia',
    },
    6: {
        name: 'Реакт.ст',
        icon: <ReactiveIcon />,
        fieldName: 'reactive',
    },
    7: {
        name: 'Хв',
        icon: <IllnessIcon />,
        fieldName: 'illness',
    },
    8: {
        name: 'Інф',
        icon: <InfectionIcon />,
        fieldName: 'infection',
    },
    9: {
        name: 'Мех. трав.',
        icon: <MechanicalInjuryIcon />,
        fieldName: 'mechanical',
    }
};

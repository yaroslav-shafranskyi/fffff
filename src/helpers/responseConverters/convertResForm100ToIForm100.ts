import { converStringOrUndefinedToDateOrUndefined } from ".";
import { BodyDamageInfo, IForm100, IResponseForm100 } from "../../api";
import { getInitialForm100 } from "../../constants";

export const convertResForm100ToIForm100 = (
  resForm100?: IResponseForm100
): IForm100 => {
  if (!resForm100) {
    return getInitialForm100();
  }

  const {
    accidentTime,
    personId,
    plait,
    date,
    birthDate,
    fullName,
    personalId,
    tokenNumber,
    rank,
    gender,
    militaryBase,
    firearm,
    nuclear,
    chemical,
    biological,
    other,
    hypothermia,
    illness,
    infection,
    mechanical,
    reactive,
    antibiotic,
    serum,
    toxoid,
    antidote,
    painReliever,
    bloodTransfusion,
    bloodSubstitute,
    immobilization,
    dressing,
    bandage,
    sanitary,
    additionalInfo,
    BONES,
    BURN,
    CAVITY_WOUNDS,
    SOFT_TISSUES,
    VESSELS,
    evacuationClinics,
    evacuationPriority,
    evacuationTransport,
    evacuationType,
    ...rest
  } = resForm100;

  const bodyDamage: BodyDamageInfo[] = [];
  if (BONES) {
    bodyDamage.push(BodyDamageInfo.BONES);
  }
  if (BURN) {
    bodyDamage.push(BodyDamageInfo.BURN);
  }
  if (CAVITY_WOUNDS) {
    bodyDamage.push(BodyDamageInfo.CAVITY_WOUNDS);
  }
  if (SOFT_TISSUES) {
    bodyDamage.push(BodyDamageInfo.SOFT_TISSUES);
  }
  if (VESSELS) {
    bodyDamage.push(BodyDamageInfo.VESSELS);
  }

  const plaitDate = converStringOrUndefinedToDateOrUndefined(plait);

  const person = {
    birthDate,
    id: personId,
    fullName,
    personalId,
    tokenNumber,
    rank,
    gender,
    militaryBase,
  };

  const injury = {
    firearm,
    nuclear,
    chemical,
    biological,
    other,
    hypothermia,
    illness,
    infection,
    mechanical,
    reactive,
  };

  const treatments = {
    antibiotic,
    serum,
    toxoid,
    antidote,
    painReliever,
  };

  const operations = {
    bloodTransfusion,
    bloodSubstitute,
    immobilization,
    dressing,
    bandage,
    sanitary,
    additionalInfo,
  };

  const medicalHelp = {
    treatments,
    operations,
  };

  return {
    ...rest,
    person,
    injury,
    medicalHelp,
    bodyDamage,
    accidentTime: converStringOrUndefinedToDateOrUndefined(
      accidentTime
    ) as Date,
    plait: !plaitDate
      ? undefined
      : {
          status: !!plaitDate,
          date: plaitDate,
        },
    date: converStringOrUndefinedToDateOrUndefined(date) as Date,
    evacuation: {
      clinic: Object.entries(evacuationClinics ?? {}).map(([order, clinic]) => ({
        order: +order,
        clinic,
      })),
      priority: evacuationPriority,
      transport: evacuationTransport,
      type: evacuationType,
    },
  };
};

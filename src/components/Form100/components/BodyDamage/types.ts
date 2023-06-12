import { BodyDamageInfo, IBodyImage } from "../../../../api";

export type BodyDamageDataType = {
    image: IBodyImage;
    info: BodyDamageInfo[];
};

export interface IBodyDamageProps {
    data?: BodyDamageDataType;
    onChange?: (newData: BodyDamageDataType) => void;
}

import { object, string } from "yup";

import { IUserBrief, UserType } from "../../api";
import { defaultStringSchema } from "../../schemas";

export const manageUserSchema = object<IUserBrief>().shape({
  user: defaultStringSchema,
  role: defaultStringSchema,
  corps: string().when("role", ([role]) => {
    return role === UserType.CORPS
      ? defaultStringSchema
      : string().notRequired();
  }),
  militaryBase: string().when("role", ([role]) => {
    return role === UserType.MILITARY_BASE || role === UserType.SUBDIVISION
      ? defaultStringSchema
      : string().notRequired();
  }),
  subdivision: string().when("role", ([role]) => {
    return role === UserType.SUBDIVISION
      ? defaultStringSchema
      : string().notRequired();
  }),
});

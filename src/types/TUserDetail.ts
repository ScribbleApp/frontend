import type { TUser } from "./TUser";
import type { TPost } from "./TPost";

export type TUserDetail = TUser & {
  posts: TPost[];
  createdAt: string;
  admin: boolean;
};

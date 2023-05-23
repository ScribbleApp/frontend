import { TUser } from "./TUser";

export type TPostDetail = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  createdAt: string;
  coverImage?: string;
  user: TUser;
};

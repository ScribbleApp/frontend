import { TUser } from "./TUser";

export type TPost = {
  id: number;
  title: string;
  excerpt: string;
  createdAt: string;
  coverImage?: string;
  user: TUser;
  categories: { name: string }[];
  image_url: string;
};

export type TComment = {
  id: number;
  body: string;
  user: { id: number; email: string };
  post_id: number;
  parent_id: number;
  created_at: string;
  updated_at: string;
};

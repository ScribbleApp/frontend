import { mockPosts } from "../../helpers/mockPosts";
import { TPost } from "../../types/TPost";
import { List } from "../generics/List";
import { PostItem } from "./PostItem";

interface PostsListProps {
  posts: TPost[];
}

export const PostsList = ({ posts }: PostsListProps) => {
  return (
    <List
      items={posts}
      renderItem={(post) => <PostItem post={post} />}
      keyExtractor={({ title }) => title}
      className="flex flex-col space-y-5"
    />
  );
};

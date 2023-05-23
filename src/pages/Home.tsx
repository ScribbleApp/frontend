import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../api";

import { PostsList } from "../components/posts/PostsList";
import { CategoryList } from "../components/categories/CategoryList";

interface HomeProps {}

export const Home = ({}: HomeProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => await getAllPosts(),
  });

  if (isLoading) return <p>LOADING...</p>;

  return (
    <section className="py-10">
      <CategoryList />
      {data && <PostsList posts={data} />}
    </section>
  );
};

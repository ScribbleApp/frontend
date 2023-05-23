import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../api";

import { PostsList } from "../components/posts/PostsList";
import { CategoryList } from "../components/categories/CategoryList";
import { useEffect, useState } from "react";

interface HomeProps {}

export const Home = ({}: HomeProps) => {
  const [postCategories, setPostCategories] = useState<string[]>([]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => await getAllPosts(postCategories.join(",")),
    enabled: postCategories ? true : false,
  });

  useEffect(() => {
    refetch();
  }, [postCategories]);

  const updateCategories = async (categories: string[]) => {
    setPostCategories(categories);
    // refetch();
  };

  if (isLoading) return <p>LOADING...</p>;

  return (
    <section className="py-10">
      <CategoryList
        postCategories={postCategories}
        updateCategories={updateCategories}
      />
      {data && <PostsList posts={data} />}
    </section>
  );
};

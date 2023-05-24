import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../api";

import { PostsList } from "../components/posts/PostsList";
import { CategoryList } from "../components/categories/CategoryList";
import { useEffect, useState } from "react";

import { List } from "../components/generics/List";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

interface HomeProps {}

export const Home = ({}: HomeProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, setPostsPerPage] = useState<number>(5);

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

  if (isLoading || !data) return <p>LOADING...</p>;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  let pages = [];

  for (let i = 1; i < Math.ceil(data.length / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <section className="py-10">
      <CategoryList
        postCategories={postCategories}
        updateCategories={updateCategories}
      />
      {data && <PostsList posts={currentPosts} />}

      <List
        items={pages}
        keyExtractor={(page) => `${page}`}
        renderItem={(page) => (
          <Button
            onClick={() => {
              setCurrentPage(page);
              scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex h-5 w-5 items-center justify-center"
          >
            {page}
          </Button>
        )}
        className="my-5 flex items-center justify-end space-x-5"
      />
    </section>
  );
};

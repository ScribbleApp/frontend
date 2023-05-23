import { useQuery } from "@tanstack/react-query";
import { getPostById } from "../api";
import { Link, useParams } from "react-router-dom";

import parse from "html-react-parser";
import { useEffect } from "react";
import moment from "moment";
import { List } from "../components/generics/List";

interface PostDetailProps {}

export const PostDetail = ({}: PostDetailProps) => {
  const { id } = useParams() as { id: string };

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["posts", "id"],
    queryFn: async () => await getPostById(id),
    // placeholderData: [],
    // staleTime: Infinity,
    // cacheTime: 0,
  });

  useEffect(() => {
    refetch();
  }, [id]);

  // refetch();
  if (isLoading) return <p>loading...</p>;

  return (
    <section className="py-10">
      {data && (
        <article className="prose prose-a:no-underline">
          <h1 className="mb-0">{data.title}</h1>
          {data.categories && (
            <List
              items={data.categories}
              keyExtractor={({ name }) => name}
              renderItem={({ name }) => (
                <Link
                  to={"/"}
                  className="text-sm text-neutral-400 hover:text-neutral-500"
                >
                  {name}
                </Link>
              )}
              className="m-0 flex list-none items-center space-x-5 p-0 prose-li:p-0"
            />
          )}

          <div className="flex items-center space-x-2">
            <Link
              to={"/users/" + data.user.id}
              className="text-sm font-medium text-indigo-400 hover:text-indigo-500"
            >
              {data.user.email}
            </Link>
            <span className="text-sm font-medium text-neutral-400">•</span>
            <time className="text-sm font-medium text-neutral-500">
              {moment(data.createdAt).format("ll").toLocaleLowerCase()}
            </time>
          </div>
          {parse(data.content)}
        </article>
      )}
    </section>
  );
};

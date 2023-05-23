import { useQuery } from "@tanstack/react-query";
import { getPostById } from "../api";
import { Link, useParams } from "react-router-dom";

import parse from "html-react-parser";

import moment from "moment";

interface PostDetailProps {}

export const PostDetail = ({}: PostDetailProps) => {
  const { id } = useParams() as { id: string };

  const { isLoading, data } = useQuery({
    queryKey: ["posts", "id"],
    queryFn: async () => await getPostById(id),
  });

  if (isLoading) return <p>loading...</p>;

  return (
    <section className="py-10">
      {data && (
        <article className="prose prose-a:no-underline">
          <h1>{data.title}</h1>
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

import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../api";
import { Link, useParams } from "react-router-dom";
import { List } from "../components/generics/List";

import moment from "moment";

interface UserDetailProps {}

export const UserDetail = ({}: UserDetailProps) => {
  const { id } = useParams() as { id: string };

  const { isLoading, data } = useQuery({
    queryKey: ["users", "id"],
    queryFn: async () => await getUserById(id),
  });

  if (isLoading) return <p>loading...</p>;

  return (
    <>
      {data && (
        <section className="prose py-10">
          <h1>
            {data.email}{" "}
            {data.admin && <span className="text-indigo-500">• admin</span>}
          </h1>
          <time>
            since {moment(data.createdAt).format("ll").toLocaleLowerCase()}
          </time>
          <h3>Check out posts {data.email} wrote!!!</h3>
          <List
            items={data.posts}
            keyExtractor={({ title }) => title}
            renderItem={(post) => (
              <Link to={"/posts/" + post.id}>{post.title}</Link>
            )}
          />
        </section>
      )}
    </>
  );
};

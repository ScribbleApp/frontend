import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserById, subscribe } from "../api";
import { Link, useParams } from "react-router-dom";
import { List } from "../components/generics/List";

import { UserContext } from "../context/userContext";
import { useContext } from "react";

import moment from "moment";
import { NavLink } from "../components/ui/NavLink";
import { Button } from "../components/ui/Button";

interface UserDetailProps {}

export const UserDetail = ({}: UserDetailProps) => {
  const { userId, isLoggedIn } = useContext(UserContext);

  const queryClient = useQueryClient();

  const { id } = useParams() as { id: string };

  const isMyAccount = +id === userId;

  const { isLoading, data } = useQuery({
    queryKey: ["users", "id"],
    queryFn: async () => await getUserById(id),
  });

  const { mutate } = useMutation({
    mutationFn: async () => await subscribe(+id),
    onSuccess() {
      queryClient.invalidateQueries(["subscriptions", "id"]);
    },
  });

  if (isLoading) return <p>loading...</p>;

  return (
    <>
      {data && (
        <section className="prose relative py-10">
          <h1>
            {data.email}{" "}
            {data.admin && <span className="text-indigo-500">• admin</span>}
          </h1>
          {!isMyAccount && isLoggedIn && (
            <Button className="mb-10 block" onClick={() => mutate()}>
              subscribe
            </Button>
          )}
          <time>
            since {moment(data.createdAt).format("ll").toLocaleLowerCase()}
          </time>
          {isMyAccount ? (
            <h3>All your posts</h3>
          ) : (
            <h3>Check out posts {data.email} wrote!!!</h3>
          )}
          <List
            items={data.posts}
            keyExtractor={({ title }) => title}
            renderItem={(post) => (
              <Link to={"/posts/" + post.id}>{post.title}</Link>
            )}
          />

          {isMyAccount && (
            <NavLink to={"/posts/new"} className="inline-block no-underline">
              write new post!
            </NavLink>
          )}
        </section>
      )}
    </>
  );
};

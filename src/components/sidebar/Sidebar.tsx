import { useQuery, useMutation } from "@tanstack/react-query";

import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { getSavedPosts, removeFromSavedPosts } from "../../api";

import { SubscriptionList } from "../subscriptions/SubscriptionList";

import { List } from "../generics/List";
import { Link } from "react-router-dom";

import { X } from "lucide-react";

interface SidebarProps {}

export const Sidebar = ({}: SidebarProps) => {
  const { isLoggedIn, userId } = useContext(UserContext);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["posts", "saved"],
    queryFn: async () => await getSavedPosts(),
    enabled: isLoggedIn,
    onSuccess(data) {
      console.log(data);
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (id: number) => await removeFromSavedPosts(id),
    onSuccess() {
      refetch();
    },
  });

  // if (isLoading) return <p>loading...</p>;

  return (
    <div className="flex h-full min-h-screen justify-center border-l border-neutral-500">
      <div className="mt-10">
        {data && isLoggedIn ? (
          <>
            <h5 className="mb-5 font-medium">You saved these for later:</h5>
            <List
              items={data}
              keyExtractor={({ post: { title } }) => title}
              renderItem={({ post: { id, title }, id: savedId }) => (
                <div className="mb-1 flex items-center justify-between">
                  <Link
                    to={"/posts/" + id}
                    className="font-medium text-indigo-400 hover:text-indigo-500"
                  >
                    {title}
                  </Link>
                  <button
                    className="text-neutral-400 hover:text-neutral-500"
                    onClick={() => mutate(savedId)}
                  >
                    <X size={20} />
                  </button>
                </div>
              )}
              className="mb-10"
            />
          </>
        ) : (
          "Hello"
        )}

        {isLoggedIn && (
          <>
            <h5 className="mb-5 font-medium">Your subscriptions:</h5>
            <SubscriptionList id={userId} />
          </>
        )}
      </div>
    </div>
  );
};

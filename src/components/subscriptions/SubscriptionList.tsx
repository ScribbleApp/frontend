import { useQuery } from "@tanstack/react-query";
import { getSubscriptions } from "../../api";

import { List } from "../generics/List";
import { Link } from "react-router-dom";

interface SubscriptionListProps {
  id: number;
}

export const SubscriptionList = ({ id }: SubscriptionListProps) => {
  const { data } = useQuery({
    queryKey: ["subscriptions", "id"],
    queryFn: async () => await getSubscriptions(id),
  });

  return (
    <>
      {data ? (
        <List
          items={data}
          keyExtractor={({ email }) => email}
          renderItem={({ email, userId }) => (
            <Link
              to={"/users/" + userId}
              className="font-medium text-indigo-400 hover:text-indigo-500"
            >
              {email}
            </Link>
          )}
        />
      ) : (
        "..."
      )}
    </>
  );
};

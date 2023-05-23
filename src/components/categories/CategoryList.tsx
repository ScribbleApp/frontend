import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../api";

import { List } from "../generics/List";
import { Link } from "react-router-dom";

interface CategoryListProps {}

export const CategoryList = ({}: CategoryListProps) => {
  const { data } = useQuery({
    queryKey: ["posts", "categories"],
    queryFn: async () => await getAllCategories(),
  });

  return (
    <>
      {data ? (
        <List
          items={data}
          keyExtractor={({ name }) => name}
          renderItem={({ name }) => (
            <Link
              to={"/"}
              className="block rounded-full bg-indigo-500 px-4 py-2 text-sm text-white hover:bg-indigo-600"
            >
              {name}
            </Link>
          )}
          className="mb-10 flex items-center space-x-8"
        />
      ) : (
        "..."
      )}
    </>
  );
};

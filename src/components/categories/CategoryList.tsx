import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../api";

import { List } from "../generics/List";
import { Link } from "react-router-dom";

import { useState, type ChangeEvent } from "react";

interface CategoryListProps {
  updateCategories: (categories: string[]) => void;
  postCategories: string[];
}

export const CategoryList = ({
  updateCategories,
  postCategories,
}: CategoryListProps) => {
  // const [postCategories, setPostCategories] = useState<string[]>([]);

  const { data } = useQuery({
    queryKey: ["posts", "categories"],
    queryFn: async () => await getAllCategories(),
  });

  const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      let updCategories = [...postCategories];
      updCategories.push(e.target.value);
      let unique = new Set(updCategories);
      updCategories = Array.from(unique);

      updateCategories(updCategories);
    } else {
      let updCategories = [...postCategories];
      updCategories = updCategories.filter((c) => c !== e.target.value);
      updateCategories(updCategories);
    }

    console.log(postCategories);
  };

  return (
    <>
      {data ? (
        <List
          items={data}
          keyExtractor={({ name }) => name}
          renderItem={({ name, id }) => (
            <div className="flex items-center space-x-1">
              <input type="checkbox" value={name} onChange={onChangeCheckbox} />
              <label htmlFor={name}>{name}</label>
            </div>
          )}
          className="mb-10 flex list-none items-center space-x-5 p-0"
        />
      ) : (
        "..."
      )}
    </>
  );
};

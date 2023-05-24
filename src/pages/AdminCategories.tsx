import { useQuery, useMutation } from "@tanstack/react-query";
import { createCategory, deleteCategory, getAllCategories } from "../api";
import { Button } from "../components/ui/Button";

import { useState } from "react";

interface AdminCategoriesProps {}

export const AdminCategories = ({}: AdminCategoriesProps) => {
  const [newCategory, setNewCategory] = useState<string>("");

  const { data: categories, refetch } = useQuery({
    queryKey: ["admin", "categories"],
    queryFn: async () => await getAllCategories(),
  });

  const { mutate } = useMutation({
    mutationFn: async (id: number) => await deleteCategory(id),
    onSuccess() {
      refetch();
    },
  });

  const { mutate: createNewCategory } = useMutation({
    mutationFn: async (name: string) => await createCategory(name),
    onSuccess() {
      refetch();
    },
  });

  return (
    <>
      {categories && (
        <table className="table-auto">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.name}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                  <button onClick={() => mutate(category.id)}>delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          createNewCategory(newCategory);
          setNewCategory("");
        }}
      >
        <input
          type="text"
          className="form-input"
          placeholder="add new category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <Button className="ml-5 rounded-none">add</Button>
      </form>
    </>
  );
};

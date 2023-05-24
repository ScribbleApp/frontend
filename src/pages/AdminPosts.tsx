import { useQuery, useMutation } from "@tanstack/react-query";
import { deletePost, getAllPosts } from "../api";

import moment from "moment";

interface AdminPostsProps {}

export const AdminPosts = ({}: AdminPostsProps) => {
  const { data: posts, refetch } = useQuery({
    queryKey: ["admin", "posts"],
    queryFn: async () => await getAllPosts(),
  });

  const { mutate } = useMutation({
    mutationFn: async (id: number) => await deletePost(id),
    onSuccess() {
      refetch();
    },
  });

  return (
    <>
      {posts && (
        <table className="table-auto">
          <thead>
            <tr>
              <th>id</th>
              <th>title</th>
              <th>created at</th>
              <th>cover image</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.title}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{moment(post.createdAt).format("LL")}</td>
                <td>
                  <a href={post.image_url} target="_blank">
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="m-0 block h-10 w-10 max-w-full object-cover p-0"
                    />
                  </a>
                </td>
                <td>
                  <button onClick={() => mutate(post.id)}>delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

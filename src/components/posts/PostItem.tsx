import { TPost } from "../../types/TPost";

import { NavLink } from "../ui/NavLink";
import { Link } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import moment from "moment";
import { addToSavedPosts } from "../../api";
import { List } from "../generics/List";

interface PostItemProps {
  post: TPost;
}

export const PostItem = ({
  post: { title, excerpt, coverImage, id, user, createdAt, categories },
}: PostItemProps) => {
  const publishedDate = moment(createdAt).format("LL").toLocaleLowerCase();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async () => await addToSavedPosts(id),
    onSuccess(data) {
      console.log(data);
      queryClient.invalidateQueries(["posts", "saved"]);
    },
  });

  return (
    <div className="flex justify-between border border-neutral-500 bg-neutral-50">
      <div className="flex flex-col justify-between p-5">
        <div className="flex items-center space-x-2">
          <Link
            to={"/users/" + user.id}
            className="text-sm font-medium text-indigo-400 hover:text-indigo-500"
          >
            {user.email}
          </Link>
          <span className="text-sm font-medium text-neutral-400">•</span>
          <time className="text-sm font-medium text-neutral-500">
            {publishedDate}
          </time>
          <span className="text-sm font-medium text-neutral-400">•</span>
          <button
            onClick={() => mutate()}
            className="text-sm font-medium text-neutral-400 hover:text-neutral-500"
          >
            save for later
          </button>
        </div>
        <div>
          <Link to={"/posts/" + id} className="text-xl font-medium">
            {title}
          </Link>
          <p>{excerpt}</p>
        </div>
        <div>
          {categories && (
            <List
              items={categories}
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
        </div>
      </div>
      <div className="border-l border-neutral-500">
        <img
          src={coverImage}
          alt={title}
          className=" block h-44 w-44 object-cover"
        />
      </div>
    </div>
  );
};

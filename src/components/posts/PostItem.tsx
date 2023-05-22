import { Link } from "react-router-dom";
import { TPost } from "../../types/TPost";

import { NavLink } from "../ui/NavLink";

interface PostItemProps {
  post: TPost;
}

export const PostItem = ({
  post: { title, excerpt, coverImage, id },
}: PostItemProps) => {
  return (
    <div className="flex justify-between border border-neutral-500 bg-neutral-50">
      <div className="flex flex-col justify-between p-5">
        <div>
          <h3 className="text-xl font-medium">{title}</h3>
          <p>{excerpt}</p>
        </div>
        <div>
          <NavLink to={"/posts/" + id}>read</NavLink>
        </div>
      </div>
      <div className="border-l border-neutral-500">
        <img
          src={coverImage}
          alt={title}
          className=" block h-64 w-64 object-cover"
        />
      </div>
    </div>
  );
};

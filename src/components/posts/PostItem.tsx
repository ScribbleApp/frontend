import { TPost } from "../../types/TPost";

import { NavLink } from "../ui/NavLink";
import { Link } from "react-router-dom";

import moment from "moment";

interface PostItemProps {
  post: TPost;
}

export const PostItem = ({
  post: { title, excerpt, coverImage, id, user, createdAt },
}: PostItemProps) => {
  const publishedDate = moment(createdAt).format("LL").toLocaleLowerCase();

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
        </div>
        <div>
          <Link to={"/posts/" + id} className="text-xl font-medium">
            {title}
          </Link>
          <p>{excerpt}</p>
        </div>
        <div></div>
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

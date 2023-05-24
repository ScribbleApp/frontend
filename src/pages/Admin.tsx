import { useContext } from "react";
import { UserContext } from "../context/userContext";

import { Link, useNavigate, Outlet } from "react-router-dom";
import { List } from "../components/generics/List";

const adminLinks = [
  { to: "/admin/users", name: "users" },
  { to: "/admin/posts", name: "posts" },
  { to: "/admin/categories", name: "categories" },
];

interface AdminProps {}

export const Admin = ({}: AdminProps) => {
  const { isLoggedIn, isAdmin } = useContext(UserContext);
  const navigate = useNavigate();
  if (!isLoggedIn || !isAdmin) navigate("/");

  return (
    <section className="container mx-auto my-10 px-10">
      <div className="prose min-w-full">
        <h1>Welcome to Admin Page</h1>
        <List
          items={adminLinks}
          keyExtractor={({ to }) => to}
          renderItem={(link) => (
            <Link
              to={link.to}
              className="rounded-md bg-neutral-100 px-6 py-3 text-2xl no-underline"
            >
              {link.name}
            </Link>
          )}
          className="flex list-none items-center space-x-10 p-0  prose-li:m-0 prose-li:p-0"
        />
        <Link to="/" className="mb-10">
          Go to the website
        </Link>

        <Outlet />
      </div>
    </section>
  );
};

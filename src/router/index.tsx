import { createBrowserRouter } from "react-router-dom";
import { Root } from "../pages/Root";
import { Home } from "../pages/Home";
import { PostDetail } from "../pages/PostDetail";
import { NewPost } from "../pages/NewPost";
import { UserDetail } from "../pages/UserDetail";
import { Admin } from "../pages/Admin";
import { AdminUsers } from "../pages/AdminUsers";
import { AdminPosts } from "../pages/AdminPosts";
import { AdminCategories } from "../pages/AdminCategories";

export const router = createBrowserRouter([
  {
    path: "/admin",
    element: <Admin />,
    children: [
      { path: "/admin/users", element: <AdminUsers /> },
      { path: "/admin/posts", element: <AdminPosts /> },
      { path: "/admin/categories", element: <AdminCategories /> },
    ],
  },
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "/posts/new", element: <NewPost /> },
      {
        path: "/posts/:id",
        element: <PostDetail />,
      },
      { path: "/users/:id", element: <UserDetail /> },
    ],
  },
]);

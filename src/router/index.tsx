import { createBrowserRouter } from "react-router-dom";
import { Root } from "../pages/Root";
import { Home } from "../pages/Home";
import { PostDetail } from "../pages/PostDetail";
import { NewPost } from "../pages/NewPost";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "/posts/new", element: <NewPost /> },
      { path: "/posts/:id", element: <PostDetail /> },
    ],
  },
]);

import Authors from "../pages/author/Authors";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateAuthor from "../pages/author/CreateAuthor";

export const appRoutes = {
  author: {
    index: "/author",
    create: "/author/create",
    update: {
      template: "/author/{:id}",
      route: (id: number) => {
        return `/author/${id}`;
      },
    },
    get: {
      template: "/author/{:id}",
      route: (id: number) => {
        return `/author/${id}`;
      },
    },
  },
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Authors />,
  },
  {
    path: appRoutes.author.index,
    element: <Authors />,
  },
  {
    path: appRoutes.author.create,
    element: <CreateAuthor />,
  },
  {
    path: appRoutes.author.update.template,
    element: <CreateAuthor />,
  },
  {
    path: appRoutes.author.get.template,
    element: <div>Detail Page</div>,
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};

import Authors from "../pages/author/Authors";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateAuthor from "../pages/author/CreateAuthor";
import Home from "../pages/home/Home";
import NavigationBar from "../components/NavBar";

export const appRoutes = {
  home: {
    index: "/",
  },
  author: {
    index: "/author",
    create: "/author/create",
    update: {
      template: "/author/:id",
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
    path: appRoutes.home.index,
    element: withLayout(Home),
  },
  {
    path: appRoutes.author.index,
    element: withLayout(Authors),
  },
  {
    path: appRoutes.author.create,
    element: withLayout(CreateAuthor),
  },
  {
    path: appRoutes.author.update.template,
    element: withLayout(CreateAuthor),
  },
  {
    path: appRoutes.author.get.template,
    element: withLayout(CreateAuthor),
  },
]);

export const Routes = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

function withLayout(Component: React.FC) {
  return (
    <>
      <NavigationBar />
      <Component></Component>
    </>
  );
}

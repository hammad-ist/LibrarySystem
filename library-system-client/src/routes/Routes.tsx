import Authors from "../pages/author/Authors";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateAuthor from "../pages/author/CreateAuthor";
import Home from "../pages/home/Home";
import NavigationBar from "../components/NavBar";
import { AppRoutes } from "./AppRoutes";
import Books from "../pages/books/Books";
import CreateBook from "../pages/books/CreateBook";
import Login from "../pages/login/Login";
import SignUp from "../pages/signup/SignUp";
import ProtectedRoutes from "./ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: AppRoutes.authentication.login,
    element: <Login />,
  },
  {
    path: AppRoutes.authentication.signup,
    element: <SignUp />,
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: AppRoutes.home.index,
        element: withLayout(Home),
      },
      {
        path: AppRoutes.author.index,
        element: withLayout(Authors),
      },
      {
        path: AppRoutes.author.create,
        element: withLayout(CreateAuthor),
      },
      {
        path: AppRoutes.author.update.template,
        element: withLayout(CreateAuthor),
      },
      {
        path: AppRoutes.author.get.template,
        element: withLayout(CreateAuthor),
      },
      {
        path: AppRoutes.book.index,
        element: withLayout(Books),
      },
      {
        path: AppRoutes.book.create,
        element: withLayout(CreateBook),
      },
      {
        path: AppRoutes.book.update.template,
        element: withLayout(CreateBook),
      },
      {
        path: AppRoutes.book.get.template,
        element: withLayout(CreateBook),
      },
    ],
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

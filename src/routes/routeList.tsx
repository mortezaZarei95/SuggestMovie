import React, { ReactNode } from "react";

import AppLayout from "components/layout/AppLayout";

const HomePage: React.FC = React.lazy(() => import("../screens/HomePage"));

const RegisterPage: React.FC = React.lazy(
  () => import("../screens/RegisterPage")
);
const LoginPage: React.FC = React.lazy(() => import("../screens/LoginPage"));
const MoviePage: React.FC = React.lazy(() => import("../screens/MoviePage"));
const EditMoviePage: React.FC = React.lazy(
  () => import("../screens/EditMoviePage")
);
const AddMoviePage: React.FC = React.lazy(
  () => import("../screens/AddMoviePage")
);
const ProfilePage: React.FC = React.lazy(
  () => import("../screens/ProfilePage")
);

interface IRoute {
  path: string;
  element: ReactNode;
  subRoute: TRouteList;
}

type TRouteList = IRoute[];
const routeList: TRouteList = [
  {
    path: "/",
    element: <AppLayout />,
    subRoute: [
      {
        path: "/",
        element: <HomePage />,
        subRoute: [],
      },
      {
        path: "register",
        element: <RegisterPage />,
        subRoute: [],
      },
      {
        path: "login",
        element: <LoginPage />,
        subRoute: [],
      },
      {
        path: "movie/:id",
        element: <MoviePage />,
        subRoute: [],
      },
      {
        path: "edit-movie/:id",
        element: <EditMoviePage />,
        subRoute: [],
      },
      {
        path: "add-movie",
        element: <AddMoviePage />,
        subRoute: [],
      },
      {
        path: "profile",
        element: <ProfilePage />,
        subRoute: [],
      },
    ],
  },
];
export default routeList;

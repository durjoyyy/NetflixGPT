import React from "react";
import Browse from "./Browse";
import Login from "./Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTE_LOGIN, ROUTE_BROWSE } from "../utils/constants";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: ROUTE_LOGIN,
      element: <Login />,
    },
    {
      path: ROUTE_BROWSE,
      element: <Browse />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;

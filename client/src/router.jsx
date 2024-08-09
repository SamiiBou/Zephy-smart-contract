import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SelectAvatar from "./pages/SelectAvatar";
import Dashboard from "./components/layouts/Dashboard";

import DashboardHome from "./pages/dashboard/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "select-avatar",
    element: <SelectAvatar />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardHome />,
      },
      {
        path: "/dashboard/goal",
        element: <div>Home GOAL!!</div>,
      },
    ],
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);

export default router;

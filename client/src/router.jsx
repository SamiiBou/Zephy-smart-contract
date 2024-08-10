import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SelectAvatar from "./pages/SelectAvatar";
import Invoice, { Loader as InvoiceLoader } from "./pages/Invoice";

import DashboardHome from "./pages/dashboard/Home";
import DashboardInvoice from "./pages/dashboard/Invoice";
import DashboardSettings from "./pages/dashboard/Settings";
import DashboardLoan from "./pages/dashboard/Loan";

import DashboardLayout from "./components/layouts/Dashboard";
import MainLayout from "./components/layouts/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about",
        element: <div>About</div>,
      },
    ],
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
    path: "pay/:ref",
    element: <Invoice />,
    loader: InvoiceLoader,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardHome />,
      },
      {
        path: "/dashboard/invoices",
        element: <DashboardInvoice />,
      },
      {
        path: "/dashboard/loans",
        element: <DashboardLoan />,
      },
      {
        path: "/dashboard/settings",
        element: <DashboardSettings />,
      },
      {
        path: "/dashboard/goal",
        element: <div>Home GOAL!!</div>,
      },
    ],
  },
]);

export default router;

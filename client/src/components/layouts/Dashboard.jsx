import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaCog,
  FaSignOutAlt,
  FaFileInvoice,
  FaCreditCard,
} from "react-icons/fa";
import Logo from "../ui/Logo";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row">
      <nav className=" bg-purple-950 w-64  h-screen left-0 top-0">
        <div className="px-4 py-4">
          <Logo textWhite={true} />
        </div>
        <ul className="py-4 px-4">
          <li className="mb-2">
            <Link
              to="/dashboard"
              className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700"
            >
              <FaHome className="mr-3 text-lg" />
              <span>Home</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/dashboard/invoices"
              className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700"
            >
              <FaFileInvoice className="mr-3 text-lg" />
              <span>Invoices</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/dashboard/loans"
              className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700"
            >
              <FaCreditCard className="mr-3 text-lg" />
              <span>Loans</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/dashboard/settings"
              className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700"
            >
              <FaCog className="mr-3 text-lg" />
              <span>Settings</span>
            </Link>
          </li>
          <li className="mb-2">
            <button
              onClick={navigate("/")}
              className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-700"
            >
              <FaSignOutAlt className="mr-3 text-lg" />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>
      <main className="w-full flex justify-between flex-col">
        <div>
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            </div>
          </header>
          <Outlet />
        </div>
        <footer className="bg-white">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500">
              © 2023 Your Company Name. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
export default Dashboard;

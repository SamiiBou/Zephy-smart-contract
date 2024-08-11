import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";

function Dashboard() {
  return (
    <div className="flex flex-row">
      <nav className=" bg-purple-950 w-64 pt-[100px] h-screen left-0 top-0">
        <ul className="py-4">
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
              <FaUser className="mr-3 text-lg" />
              <span>Invoices</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/dashboard/loans"
              className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700"
            >
              <FaUser className="mr-3 text-lg" />
              <span>Loans</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/settings"
              className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700"
            >
              <FaCog className="mr-3 text-lg" />
              <span>Settings</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/logout"
              className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700"
            >
              <FaSignOutAlt className="mr-3 text-lg" />
              <span>Logout</span>
            </Link>
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

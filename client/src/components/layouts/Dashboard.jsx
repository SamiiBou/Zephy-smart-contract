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
    <div className="flex flex-row h-screen w-full">
      <nav className=" w-72 p-3 h-screen left-0 top-0">
        <div className="bg-purple-950 flex flex-col justify-between rounded-lg h-full ">
          <div>
            <div className="px-4 py-4">
              <Logo textWhite={true} />
            </div>
            <ul className="py-4 flex flex-col gap-3 px-4">
              <li className="mb-2">
                <Link to="/dashboard" className="dashboard__nav-item">
                  <FaHome className="mr-3 text-lg" />
                  <span>Home</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/dashboard/invoices" className="dashboard__nav-item">
                  <FaFileInvoice className="mr-3 text-lg" />
                  <span>Invoices</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/dashboard/loans" className="dashboard__nav-item">
                  <FaCreditCard className="mr-3 text-lg" />
                  <span>Loans</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/dashboard/settings" className="dashboard__nav-item">
                  <FaCog className="mr-3 text-lg" />
                  <span>Settings</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="p-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
              className="flex items-center w-full dashboard__nav-item"
            >
              <FaSignOutAlt className="mr-3 text-lg" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>
      <main className="w-full flex h-screen p-3 overflow-y-auto justify-between flex-col">
        <div>
          <header className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto py-3 pb-6 px-4 sm:px-6 lg:px-8">
              <h3 className="text-xl font-orbitron font-bold text-gray-900">
                Dashboard
              </h3>
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

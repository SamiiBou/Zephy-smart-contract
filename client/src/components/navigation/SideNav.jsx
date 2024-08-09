import { Link } from "react-router-dom";
import { FaHome, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";

const SideNav = () => {
  return (
    <nav className="bg-gray-800 w-64 pt-[100px] h-screen left-0 top-0">
      <ul className="py-4">
        <li className="mb-2">
          <Link
            to="/"
            className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700"
          >
            <FaHome className="mr-3 text-lg" />
            <span>Home</span>
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/profile"
            className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700"
          >
            <FaUser className="mr-3 text-lg" />
            <span>Profile</span>
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
  );
};

export default SideNav;

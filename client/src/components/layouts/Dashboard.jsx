import { Outlet } from "react-router-dom";
import SideNav from "../navigation/SideNav";

function Dashboard() {
  return (
    <div className="flex flex-row">
      <nav>
        <SideNav />
      </nav>
      <main className="w-full flex flex-col">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          </div>
        </header>
        <Outlet />
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

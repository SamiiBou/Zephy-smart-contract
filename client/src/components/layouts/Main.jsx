import { Outlet, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Logo from "../ui/Logo";

export default function Main() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black w-full">
      <nav className="fixed w-full border-b-2 border-[rgba(255,255,255,.2)] bg-opacity-10 backdrop-filter backdrop-blur-lg bg-white">
        <div className="container  text-white mx-auto py-3 px-4  ">
          {" "}
          <div className="flex items-center justify-between">
            <div className="logo">
              <Logo />
            </div>{" "}
            <ul className="flex space-x-2">
              <li>
                <a className="nav-item" href="/">
                  Home
                </a>
              </li>
              <li>
                <a className="nav-item" href="/about">
                  About
                </a>
              </li>
              <li>
                <a className="nav-item" href="#">
                  Contact
                </a>
              </li>
            </ul>
            <div>
              <Button
                variant="cta"
                onClick={() => navigate("/register")}
                className="text-white rounded-lg"
              >
                Join Us
              </Button>
            </div>
          </div>
        </div>
      </nav>
      <main className="min-h-screen flex justify-between flex-col">
        <section className="h-full">
          <Outlet />
        </section>
        <footer className="bg-black border-t border-[rgba(255,255,255,.2)] text-white py-8">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="w-full mb-6 md:mb-0">
                <Logo textWhite={true} />
              </div>
              <div className="mb-6 md:mb-0">
                <h3 className="text-xl font-bold mb-2 whitespace-nowrap">
                  Quick Links
                </h3>
                <ul className="text-sm">
                  <li>
                    <a href="#" className="hover:text-gray-400">
                      Whitepaper
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-gray-400">
                      Token Economics
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-gray-400">
                      Community
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 text-center text-sm">
              <p>© 2023 Web3 Project. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

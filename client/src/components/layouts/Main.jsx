import { Outlet, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Logo from "../ui/Logo";

export default function Main() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black w-full">
      <nav className="fixed w-full">
        <div className="container border-b-2 border-[rgba(255,255,255,.2)] text-white mx-auto py-3 px-4">
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
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-between">
              <div className="w-full md:w-1/3 mb-6 md:mb-0">
                <h3 className="text-xl font-bold mb-2">About Us</h3>
                <p className="text-sm">
                  We are a decentralized platform leveraging blockchain
                  technology to revolutionize the web.
                </p>
              </div>
              <div className="w-full md:w-1/3 mb-6 md:mb-0">
                <h3 className="text-xl font-bold mb-2">Quick Links</h3>
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
              <div className="w-full md:w-1/3">
                <h3 className="text-xl font-bold mb-2">Connect</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-2xl hover:text-gray-400">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="text-2xl hover:text-gray-400">
                    <i className="fab fa-telegram"></i>
                  </a>
                  <a href="#" className="text-2xl hover:text-gray-400">
                    <i className="fab fa-discord"></i>
                  </a>
                  <a href="#" className="text-2xl hover:text-gray-400">
                    <i className="fab fa-github"></i>
                  </a>
                </div>
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

import "./Navbar.css";
import { useCycle } from "framer-motion";
import logo from "../assets/Logo.png";
import SideMenu from "./SideMenu";
import { Link, useNavigate } from "react-router-dom";
import { useCurrentUser } from "../context/userContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();
  const [open, cycleOpen] = useCycle(false, true);

  return (
    <>
      <SideMenu open={open} onClose={cycleOpen} />
      <nav className="h-14 md:h-20 xl:px-5 w-full bg-white mx-auto">
        <div className="m-auto flex items-center min-h-full justify-between max-w-[95%]">
          <div className="left-container flex items-center md:space-x-10">
            <div
              className="ham-container p-2 -ml-2"
              onClick={() => cycleOpen()}
              role="button"
              // aria-controls="side-menu"
              aria-label="Apri menu laterale"
            >
              <svg
                width="40"
                height="20"
                viewBox="0 0 40 20"
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
                className="hamburger-icon"
                aria-hidden="true"
              >
                <rect width="40" height="4" rx="2" />
                <rect y="8" width="40" height="4" rx="2" />
                <rect y="16" width="40" height="4" rx="2" />
              </svg>
            </div>
            <div
              className="flex items-center logo-container hover:cursor-pointer space-x-1"
              onClick={() => navigate("/")}
            >
              <img
                className="logo w-[20px] h-[20px] md:w-[30px] md:h-[30px]"
                src={logo}
                alt="logo GreenWorld"
              />
              <span className="logo-name text-lg md:text-xl mb-0 md:mb-[0.125rem]">GreenWorld</span>
            </div>
          </div>
          {currentUser ? (
            <div className="flex items-center space-x-2 md:space-x-5">
              <Link to="/logout" className="hover-underline-animation font-semibold">
                Logout
              </Link>
              <button className="secondary nav" onClick={() => navigate("/profilo")}>
                Profilo
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2 md:space-x-5">
              <Link to="/registrazione" className="hover-underline-animation font-semibold">
                Registrati
              </Link>
              <button className="secondary nav" onClick={() => navigate("/login")}>
                Login
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;

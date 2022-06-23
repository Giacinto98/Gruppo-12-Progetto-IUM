import "./SideMenu.css";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import useWindowSize from "../hooks/windowSize";
import { TAILWINDCSS_LG_BREAKPOINT } from "../constants/tailwind";

interface Props {
  open: boolean;
  onClose: () => void;
}

const SideMenu = ({ open, onClose }: Props) => {
  const [width] = useWindowSize();

  return (
    <AnimatePresence>
      {open && (
        <div>
          <motion.div
            className="fixed bg-gray-800 h-full w-full z-50 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ ease: "easeOut", duration: 0.3 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            onClick={onClose}
          ></motion.div>
          <motion.nav
            className={`w-[90%] lg:w-1/4 h-full bg-white fixed z-50`}
            initial={{ left: width > TAILWINDCSS_LG_BREAKPOINT ? "-25%" : "-90%" }}
            animate={{ left: 0 }}
            transition={{ ease: "easeOut", duration: 0.3 }}
            exit={{
              left: width > TAILWINDCSS_LG_BREAKPOINT ? "-25%" : "-90%",
              transition: { duration: 0.3 },
            }}
          >
            <div className="flex flex-col space-y-3 pt-10 z-10">
              <div
                className="ml-auto mr-10 p-2 w-[50px] ham-close-container"
                onClick={onClose}
                role="button"
                aria-label="Chiudi menu laterale"
              >
                <svg
                  viewBox="0 0 600 600"
                  fill="black"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <rect
                    x="6"
                    y="538"
                    width="752.468"
                    height="80"
                    rx="40"
                    transform="rotate(-45 6 538)"
                  />
                  <rect
                    x="538"
                    y="595"
                    width="752.468"
                    height="80"
                    rx="40"
                    transform="rotate(-135 538 595)"
                  />
                </svg>
              </div>
              <Link
                to="segnalazioni"
                className="menu-option text-lg font-semibold pl-10 py-3 "
                onClick={onClose}
              >
                Segnalazioni
              </Link>
              <Link
                to="segnala"
                className="menu-option text-lg font-semibold pl-10 py-3 "
                onClick={onClose}
              >
                Segnala un luogo
              </Link>
              <Link
                to="crea-evento"
                className="menu-option text-lg font-semibold pl-10 py-3 "
                onClick={onClose}
              >
                Crea evento
              </Link>
              <Link
                to="organizzatore"
                className="menu-option text-lg font-semibold pl-10 py-3 "
                onClick={onClose}
              >
                Diventa organizzatore
              </Link>
              <Link
                to="candidatura-sponsor"
                className="menu-option text-lg font-semibold pl-10 py-3 "
                onClick={onClose}
              >
                Diventa sponsor
              </Link>
              <Link
                to="testimonianze"
                className="menu-option text-lg font-semibold pl-10 py-3 "
                onClick={onClose}
              >
                Elenco testimonianze
              </Link>
            </div>
          </motion.nav>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SideMenu;

import { ReactNode, useLayoutEffect } from "react";
import { useLocation } from "react-router";
import { useNavigationType } from "react-router-dom";

const ScrollToTop = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigationType = useNavigationType();

  useLayoutEffect(() => {
    // scroll to top except when you click the back button
    if (navigationType !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [location, navigationType]);

  return <>{children}</>;
};

export default ScrollToTop;

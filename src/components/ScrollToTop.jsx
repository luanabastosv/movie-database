import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// FUNCION TO ALWAYS SCROLL TO TOP
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToHashElement({ offset = 100 }) {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - offset, // aqui você aplica o offset
          behavior: "smooth",
        });
      }
    }
  }, [hash, offset]);

  return null;
}

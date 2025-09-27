import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLastMovie } from "../context/LastMovieContext";
import { useHero } from "../context/HeroContext";

function Nav() {
  const { lastMovieId } = useLastMovie();
  const { heroMovieId } = useHero();

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // NAV CLICKS HANDLE
  const handleNavClick = (e, path) => {
    e.preventDefault();
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  };

  // CHOOSING SELECTED MOVIE TO SHOW ON SINGLE DETAIL PAGE
  const detailsId = lastMovieId || heroMovieId;

  // RETURNS
  return (
    <div className="nav-content">
      <nav className={isOpen ? "open" : ""}>
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul>
          <li>
            <a href="/" onClick={(e) => handleNavClick(e, "/")}>
              <img src="/assets/images/icon-home.png" alt="Home Icon" />
            </a>
            <p>Home</p>
          </li>
          <li>
            <a
              href={detailsId ? `/movie-profile/${detailsId}` : "#"}
              onClick={(e) =>
                handleNavClick(
                  e,
                  detailsId ? `/movie-profile/${detailsId}` : null
                )
              }
            >
              <img src="/assets/images/icon-feed.png" alt="Single Movie Icon" />
            </a>
            <p>Details</p>
          </li>
          <li>
            <a href="/favs" onClick={(e) => handleNavClick(e, "/favs")}>
              <img
                src="/assets/images/icon-save-white.png"
                alt="Saved Movies Icon"
              />
            </a>
            <p>Saved</p>
          </li>
          <li>
            <a href="/about" onClick={(e) => handleNavClick(e, "/about")}>
              <img src="/assets/images/icon-about.png" alt="About Icon" />
            </a>
            <p>About</p>
          </li>
        </ul>
        <a
          href="/"
          className="logo-icon-mobile"
          onClick={(e) => handleNavClick(e, "/")}
        >
          <img src="/assets/images/muvi-logo.png" alt="Muvi Logo" />
        </a>
      </nav>

      <a href="/" className="logo-icon" onClick={(e) => handleNavClick(e, "/")}>
        <img src="/assets/images/muvi-logo.png" alt="Muvi Logo" />
      </a>
    </div>
  );
}

export default Nav;

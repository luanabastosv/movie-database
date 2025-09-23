// import { NavLink } from "react-router-dom";
// import { useLastMovie } from "../context/LastMovieContext";
// import { useHero } from "../context/HeroContext";

// function Nav() {
//   const { lastMovieId } = useLastMovie();
//   const { heroMovieId } = useHero();

//   const navigate = useNavigate();

//   const handleNavClick = (e, path) => {
//     e.preventDefault(); // evita o comportamento padrão do link
//     navigate(path); // navega para a rota
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth", // animação suave
//     });
//   };

//   return (
//     <nav>
//       <ul>
//         <li>
//           <NavLink to="/" onClick={(e) => handleNavClick(e, "/")}>
//             <img src="/assets/images/icon-home.png" alt="Home Icon" />
//           </NavLink>
//           <p>Home</p>
//         </li>
//         <li>
//           <NavLink
//             to={
//               lastMovieId
//                 ? `/movie-profile/${lastMovieId}`
//                 : `/movie-profile/${heroMovieId}`
//             }
//             onClick={(e) =>
//               handleNavClick(
//                 e,
//                 lastMovieId
//                   ? `/movie-profile/${lastMovieId}`
//                   : `/movie-profile/${heroMovieId}`
//               )
//             }
//           >
//             <img src="/assets/images/icon-feed.png" alt="Single Movie Icon" />
//           </NavLink>
//           <p>Details</p>
//         </li>
//         <li>
//           <NavLink to="/favs" onClick={(e) => handleNavClick(e, "/favs")}>
//             <img
//               src="/assets/images/icon-save-white.png"
//               alt="Saved Movies Icon"
//             />
//           </NavLink>
//           <p>Saved</p>
//         </li>
//         <li>
//           <NavLink to="/favs" onClick={(e) => handleNavClick(e, "/about")}>
//             <img src="/assets/images/icon-about.png" alt="About Icon" />
//           </NavLink>
//           <p>About</p>
//         </li>
//       </ul>
//       <NavLink to="/" className="logo-icon">
//         <img src="/assets/images/muvi-logo.png" alt="Muvi Logo" />
//       </NavLink>
//     </nav>
//   );
// }

// export default Nav;
import { NavLink, useNavigate } from "react-router-dom";
import { useLastMovie } from "../context/LastMovieContext";
import { useHero } from "../context/HeroContext";

function Nav() {
  const { lastMovieId } = useLastMovie();
  const { heroMovieId } = useHero();

  const navigate = useNavigate();

  const handleNavClick = (e, path) => {
    e.preventDefault(); // evita o comportamento padrão do link
    navigate(path); // navega para a rota
    window.scrollTo({
      top: 0,
      behavior: "smooth", // animação suave
    });
  };

  return (
    <nav>
      <ul>
        <li>
          <a href="/" onClick={(e) => handleNavClick(e, "/")}>
            <img src="/assets/images/icon-home.png" alt="Home Icon" />
          </a>
          <p>Home</p>
        </li>
        <li>
          <a
            href={lastMovieId ? `/movie-profile/${lastMovieId}` : `/movie-profile/${heroMovieId}`}
            onClick={(e) =>
              handleNavClick(e, lastMovieId ? `/movie-profile/${lastMovieId}` : `/movie-profile/${heroMovieId}`)
            }
          >
            <img src="/assets/images/icon-feed.png" alt="Single Movie Icon" />
          </a>
          <p>Details</p>
        </li>
        <li>
          <a href="/favs" onClick={(e) => handleNavClick(e, "/favs")}>
            <img src="/assets/images/icon-save-white.png" alt="Saved Movies Icon" />
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

      <a href="/" className="logo-icon" onClick={(e) => handleNavClick(e, "/")}>
        <img src="/assets/images/muvi-logo.png" alt="Muvi Logo" />
      </a>
    </nav>
  );
}

export default Nav;

import { useEffect, useContext } from "react";
import { FavsContext } from "../context/FavsContext";
import { appTitle } from "../globals/globalVariables";
import Movie from "../components/Movie";
import { Link } from "react-router-dom";

function PageFavs() {
  const { favs } = useContext(FavsContext);

  useEffect(() => {
    document.title = `${appTitle} | Favs`;
  }, []);

  return (
    <main>
      <section className="page-favorites">
        <h2>Your Favorite Movies</h2>

        {favs.length < 1 ? (
            <div className="fav-movies">
               <Link to="/#movie-grid" className="add-movie">+</Link>
            </div>
        ) : (
          <div className="fav-movies">
            {favs.map((movie) => (
              <Movie key={movie.id} movieOb={movie} isFav={true} />
            ))}
           <Link to="/#movie-grid" className="add-movie">
           <span>+</span>
           <p> Add movie...</p>
           </Link>

          </div>
        )}
      </section>
    </main>
  );
}

export default PageFavs;

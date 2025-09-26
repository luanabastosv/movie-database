import { useContext } from "react";
import { FavsContext } from "../context/FavsContext";
import { Link } from "react-router-dom";

const imageFolderPath = import.meta.env.BASE_URL + "./assets/images/";

function Movie({ movieOb, profileLink = true, isFav }) {
  const { favs, deleteFav, addFav } = useContext(FavsContext);

  function handleFavClick(obj, removeFromFavs = false) {
    if (removeFromFavs) {
      deleteFav(obj);
    } else {
      addFav(obj);
    }
  }

  return (
    <div className="movie">
      <div className="saved" onClick={() => handleFavClick(movieOb, isFav)}>
        {isFav ? (
          <img src={`${imageFolderPath}icon-saved.png`} alt="saved icon" />
        ) : (
          <img src={`${imageFolderPath}icon-save.png`} alt="save icon" />
        )}
      </div>

      <div className="movie-info">
        <p>
          {movieOb.overview
            ? movieOb.overview.slice(0, 80) + "..."
            : "No description available."}
        </p>

        {profileLink && (
          <div className="link-profile">
            <Link to={`/movie-profile/${movieOb.id}`}>More Info</Link>
          </div>
        )}
      </div>

      <div className="profile-picture">
        <img
          src={`https://image.tmdb.org/t/p/w300${movieOb.pic}`}
          alt={movieOb.name}
        />
      </div>

      <div className="rating">
        <p>{movieOb.rating ? movieOb.rating.toFixed(1) : "N/A"}</p>
      </div>
    </div>
  );
}

export default Movie;

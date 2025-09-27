import { useEffect, useState, useContext } from "react";
import { FavsContext } from "../context/FavsContext";
import { Link, useParams } from "react-router-dom";
import { useLastMovie } from "../context/LastMovieContext";
import { appTitle } from "../globals/globalVariables";

function PageMovieProfile() {
  const { favs, addFav, deleteFav } = useContext(FavsContext);
  const { id } = useParams();
  const { setLastMovieId } = useLastMovie();

  const [movieOb, setMovieOb] = useState(null);
  const [actors, setActors] = useState([]);
  const [loadingActors, setLoadingActors] = useState(true);

  // Formata a duração
  function formatDuration(runtime) {
    if (!runtime) return "N/A";
    const h = Math.floor(runtime / 60);
    const m = runtime % 60;
    return `${h}h${m > 0 ? m + "min" : ""}`;
  }

  // Salva último filme acessado
  useEffect(() => {
    if (id) setLastMovieId(id);
  }, [id, setLastMovieId]);

  // Buscar informações do filme
  useEffect(() => {
    async function fetchMovie() {
      if (!id) return;
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzEyMWE2YTc0MDdkNzlhMmJiODE5MzhkNTBhNWFmNyIsIm5iZiI6MTc1NjgzNzkxMi44OTQsInN1YiI6IjY4YjczODE4MjhjYjFjNmI5ZTE1OGIyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CjjVyW0l-k5Vr2oM-JFmZqO85xtRLeVI-mQZPNNUHb0",
              "Content-Type": "application/json;charset=utf-8",
            },
          }
        );
        const data = await res.json();
        setMovieOb({
          id: data.id,
          name: data.title,
          overview: data.overview,
          pic: data.poster_path,
          backdrop: data.backdrop_path,
          release_date: data.release_date,
          runtime: data.runtime,
          genres: data.genres,
          rating: data.vote_average,
        });
      } catch (err) {
        console.error(err);
      }
    }
    fetchMovie();
  }, [id]);

  // Buscar atores do filme
  useEffect(() => {
    async function fetchActors() {
      if (!movieOb) return;
      try {
        setLoadingActors(true);
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieOb.id}/credits?language=en-US`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzEyMWE2YTc0MDdkNzlhMmJiODE5MzhkNTBhNWFmNyIsIm5iZiI6MTc1NjgzNzkxMi44OTQsInN1YiI6IjY4YjczODE4MjhjYjFjNmI5ZTE1OGIyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CjjVyW0l-k5Vr2oM-JFmZqO85xtRLeVI-mQZPNNUHb0",
              "Content-Type": "application/json;charset=utf-8",
            },
          }
        );
        const data = await res.json();

        const mappedActors = data.cast.slice(0, 3).map((actor) => ({
          id: actor.id,
          name: actor.name,
          profile_path:
            actor.profile_path || "/assets/images/actor-placeholder.svg",
        }));

        setActors(mappedActors);
        setLoadingActors(false);
      } catch (err) {
        console.error(err);
        setLoadingActors(false);
      }
    }

    fetchActors();
  }, [movieOb]);

  // Atualiza título
  useEffect(() => {
    if (!movieOb) {
      document.title = `${appTitle} | Movie Profile`;
    } else {
      document.title = `${movieOb.name} | ${appTitle}`;
    }
  }, [movieOb]);

  // Handler do botão save
  function handleFavClick() {
    if (!movieOb) return;
    if (favs.some((f) => f.id === movieOb.id)) {
      deleteFav(movieOb);
    } else {
      addFav(movieOb);
    }
  }

  return (
    <main>
      <div
        className="page-profile"
        style={{
          "--backdrop-url": movieOb
            ? `url(https://image.tmdb.org/t/p/original${movieOb.backdrop})`
            : "none",
        }}
      >
        <section className="single-movie">
          {!movieOb ? (
            <p>
              Movie Not Found. <Link to="/">Return to Home Page</Link>
            </p>
          ) : (
            <>
              <div className="movie-content">
                <h2>{movieOb.name}</h2>

                <div className="movie-specs">
                  <p>{movieOb.release_date?.slice(0, 4)}</p>
                  <div>
                    <p>{formatDuration(movieOb.runtime)}</p>
                    <p>|</p>
                    <p>{movieOb.genres.map((g) => g.name).join(", ")}</p>
                  </div>
                </div>

                <p>{movieOb.overview}</p>

                <div className="actors">
                  {loadingActors ? (
                    <p>Loading actors...</p>
                  ) : (
                    actors.map((actor) => (
                      <img
                        key={actor.id}
                        src={
                          actor.profile_path.startsWith("/assets")
                            ? actor.profile_path
                            : `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                        }
                        alt={actor.name}
                        title={actor.name}
                      />
                    ))
                  )}
                </div>
              </div>

              <div className="movie-poster">
                <div className="saved" onClick={handleFavClick}>
                  {favs.some((f) => f.id === movieOb.id) ? (
                    <img src="/assets/images/icon-saved.png" alt="saved icon" />
                  ) : (
                    <img src="/assets/images/icon-save.png" alt="save icon" />
                  )}
                </div>

                <div className="rating">
                  <p>{movieOb.rating?.toFixed(1) || "N/A"}</p>
                </div>

                <img
                  className="movie-img"
                  src={`https://image.tmdb.org/t/p/w500${movieOb.pic}`}
                  alt={movieOb.name}
                />
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}

export default PageMovieProfile;

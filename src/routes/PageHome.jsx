import { useEffect, useContext, useState } from "react";
import { FavsContext } from "../context/FavsContext";
import { appTitle } from "../globals/globalVariables";
import Movie from "../components/Movie";
import isFav from "../utilities/isFav";
import Hero from '../components/Hero';


function PageHome() {
  const { favs } = useContext(FavsContext);

  const [movies, setMovies] = useState([]);
  const [activeSection, setActiveSection] = useState("Popular"); 

  useEffect(() => {
    document.title = `${appTitle} | Home`;
    fetchMovies("Popular");
  }, []);

  // Função para buscar filmes conforme a seção
  async function fetchMovies(section) {
    try {
      let endpoint = "/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";

      switch (section) {
        case "Top Rated":
          endpoint = "/movie/top_rated?language=en-US&page=1";
          break;
        case "Upcoming":
          endpoint = "/movie/upcoming?language=en-US&page=1";
          break;
        case "Now Playing":
          endpoint = "/movie/now_playing?language=en-US&page=1";
          break;
        case "Popular":
        default:
          endpoint = "/movie/popular?language=en-US&page=1";
          break;
      }

      const res = await fetch(`https://api.themoviedb.org/3${endpoint}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzEyMWE2YTc0MDdkNzlhMmJiODE5MzhkNTBhNWFmNyIsIm5iZiI6MTc1NjgzNzkxMi44OTQsInN1YiI6IjY4YjczODE4MjhjYjFjNmI5ZTE1OGIyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CjjVyW0l-k5Vr2oM-JFmZqO85xtRLeVI-mQZPNNUHb0`, // substitua pelo token TMDB
              "Content-Type": "application/json;charset=utf-8",
        },
      });

      const data = await res.json();

      // Adapta os dados para Movie.jsx
      const adaptedMovies = data.results.slice(0, 12).map((movie) => ({
        id: movie.id,
        pic: movie.poster_path,
        name: movie.title,
        overview: movie.overview,
        release_date: movie.release_date,
        rating: movie.vote_average,
      }));

      setMovies(adaptedMovies);
    } catch (err) {
      console.error("Erro ao buscar filmes:", err);
    }
  }

  // Função para mudar a seção
  function handleSectionClick(section) {
    setActiveSection(section);
    fetchMovies(section);
  }

  const sections = ["Popular", "Top Rated", "Upcoming", "Now Playing", "Favorites"];

  return (
  

    <main>
      <Hero />
      <section>
        <div className="sections">
          {sections.map((sec) => (
            <h2
              key={sec}
              className={activeSection === sec ? "active" : ""}
              onClick={() => handleSectionClick(sec)}
            >
              {sec}
            </h2>
          ))}
        </div>

        <div id="movie-box" className="movies-box">
          <div id="movie-grid" className="movie-grid">
            {activeSection === "Favorites"
              ? favs.map((movie) => (
                  <Movie
                    key={movie.id}
                    movieOb={movie}
                    isFav={true}
                  />
                ))
              : movies.map((movie) => (
                  <Movie
                    key={movie.id}
                    movieOb={movie}
                    isFav={isFav(favs, null, movie.id)}
                  />
                ))}
          </div>
        </div>
      </section>
    </main>
   
  );
}

export default PageHome;

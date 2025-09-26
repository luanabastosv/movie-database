import { useEffect, useContext, useState, useRef } from "react";
import { FavsContext } from "../context/FavsContext";
import { appTitle } from "../globals/globalVariables";
import Movie from "../components/Movie";
import isFav from "../utilities/isFav";
import Hero from "../components/Hero";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Mousewheel } from "swiper/modules";

function PageHome() {
  const { favs } = useContext(FavsContext);
  const [movies, setMovies] = useState([]);
  const [activeSection, setActiveSection] = useState("Popular");
  const swiperRef = useRef(null);

  const sections = [
    "Popular",
    "Top Rated",
    "Upcoming",
    "Now Playing",
    "Favorites",
  ];

  useEffect(() => {
    document.title = `${appTitle} | Home`;
    fetchMovies("Popular");
    handleSectionClick("Popular");
  }, []);

  

  async function fetchMovies(section) {
    try {
      let endpoint =
        "/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";

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
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzEyMWE2YTc0MDdkNzlhMmJiODE5MzhkNTBhNWFmNyIsIm5iZiI6MTc1NjgzNzkxMi44OTQsInN1YiI6IjY4YjczODE4MjhjYjFjNmI5ZTE1OGIyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CjjVyW0l-k5Vr2oM-JFmZqO85xtRLeVI-mQZPNNUHb0`,
          "Content-Type": "application/json;charset=utf-8",
        },
      });

      const data = await res.json();

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

  function handleSectionClick(section) {
    setActiveSection(section);
    if (section !== "Favorites") {
      fetchMovies(section);
    }
  }

  return (
    <main>
      <Hero />
      <section>
        <div className="sections">
          {/* MOBILE: carrossel */}
          <div className="sections-carousel">
             <button
              className="arrow left"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              {"<"}
            </button>

            
            <Swiper
              modules={[Mousewheel]} // 👈 ativa o módulo
              mousewheel={true}
              spaceBetween={10}
              slidesPerView={"auto"}
              centeredSlides={true}
              loop={true}
              initialSlide={sections.indexOf("Popular")}
              onSlideChange={(swiper) => {
                const section = sections[swiper.realIndex];
                handleSectionClick(section);
              }}
            >
              {sections.map((sec, i) => (
                <SwiperSlide
                  key={i}
                  style={{ width: "40%", textAlign: "center" }}
                >
                  <h2 className={activeSection === sec ? "active" : ""}>
                    {sec}
                  </h2>
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              className="arrow right"
              onClick={() => swiperRef.current?.slideNext()}
            >
              {">"}
            </button>

          </div>

          {/* TABLET/DESKTOP: lista inline normal */}
          <div className="sections-inline">
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
        </div>

        <div id="movie-box" className="movies-box">
          <div id="movie-grid" className="movie-grid">
            {activeSection === "Favorites"
              ? favs.map((movie) => (
                  <Movie key={movie.id} movieOb={movie} isFav={true} />
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

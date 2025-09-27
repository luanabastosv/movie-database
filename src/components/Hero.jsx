import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useHero } from "../context/HeroContext";

function Hero() {
  const { setHeroMovieId } = useHero();
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);


  // TAKE 3 POPULAR MOVIES
  useEffect(() => {
    async function fetchHeroMovies() {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzEyMWE2YTc0MDdkNzlhMmJiODE5MzhkNTBhNWFmNyIsIm5iZiI6MTc1NjgzNzkxMi44OTQsInN1YiI6IjY4YjczODE4MjhjYjFjNmI5ZTE1OGIyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CjjVyW0l-k5Vr2oM-JFmZqO85xtRLeVI-mQZPNNUHb0`,
              "Content-Type": "application/json;charset=utf-8",
            },
          }
        );

        const data = await res.json();

        const topMovies = data.results.slice(0, 3).map((movie) => ({
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          backdrop: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
        }));

        setMovies(topMovies);
         if (topMovies.length > 0) {
          setHeroMovieId(topMovies[0].id);
        }
      } catch (err) {
        console.error("Hero error:", err);
      }
    }

    fetchHeroMovies();
  }, []);



// SET ID FOR MOVIE IN HERO
  useEffect(() => {
    if (movies.length > 0) {
      setHeroMovieId(movies[currentIndex].id);
    }
  }, [currentIndex, movies, setHeroMovieId]);



// SLIDER HERO
  useEffect(() => {
    if (movies.length === 0) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === movies.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); 

    return () => clearInterval(intervalRef.current); 
  }, [movies]);

  if (movies.length === 0) {
    return <section className="hero">Charging...</section>;
  }

  const currentMovie = movies[currentIndex];


// RETURNS
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${currentMovie.backdrop})`,
      }}
    >
      <div className="hero-content">
        <h2>{currentMovie.title}</h2>
        <p>{currentMovie.overview}</p>
        <Link to={`/movie-profile/${currentMovie.id}`}>Read More →</Link>

        <div className="hero-nav">
          {movies.map((_, index) => (
            <span
              key={index}
              className={index === currentIndex ? "dot active" : "dot"}
              onClick={() => setCurrentIndex(index)}
            >
              •
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;


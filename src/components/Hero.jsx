// import { useEffect, useState } from "react";
// import { useHero } from "../context/HeroContext";

// function Hero() {
//   const [movies, setMovies] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const { setHeroMovieId } = useHero();


//   // SET HERO 
//   useEffect(() => {
//     if (movies.length > 0) {
//       setHeroMovieId(movies[0].id);
//     }
//   }, [movies]);

//   // Buscar filmes populares
//    useEffect(() => {
//     async function fetchHeroMovies() {
//       try {
//         const res = await fetch(
//           "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
//           {
//             headers: {
//               Authorization: `Bearer SEU_TOKEN_AQUI`,
//               "Content-Type": "application/json;charset=utf-8",
//             },
//           }
//         );

//         const data = await res.json();

//         const topMovies = data.results.slice(0, 3).map((movie) => ({
//           id: movie.id,
//           title: movie.title,
//           overview: movie.overview,
//           backdrop: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
//         }));

//         setMovies(topMovies);
//       } catch (err) {
//         console.error("Erro no Hero:", err);
//       }
//     }

//     fetchHeroMovies();
//   }, []);

//   if (movies.length === 0) {
//     return <section className="hero">Carregando...</section>;
//   }

//   const currentMovie = movies[currentIndex];

//   return (
//     <section
//       className="hero"
//       style={{
//         backgroundImage: `url(${currentMovie.backdrop})`,
//       }}
//     >
//       <div className="hero-content">
//         <h2>{currentMovie.title}</h2>
//         <p>{currentMovie.overview}</p>
//         <a href={`/movie-profile/${currentMovie.id}`}>Read More →</a>

//         <div className="hero-nav">
//           {movies.map((_, index) => (
//             <span
//               key={index}
//               className={index === currentIndex ? "dot active" : "dot"}
//               onClick={() => setCurrentIndex(index)}
//             >
//               •
//             </span>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Hero;

import { useEffect, useState, useRef } from "react";

function Hero() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  // Buscar filmes populares
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
      } catch (err) {
        console.error("Erro no Hero:", err);
      }
    }

    fetchHeroMovies();
  }, []);

  // Slider automático
  useEffect(() => {
    if (movies.length === 0) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === movies.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // troca a cada 5 segundos

    return () => clearInterval(intervalRef.current); // limpa o interval quando desmonta
  }, [movies]);

  if (movies.length === 0) {
    return <section className="hero">Carregando...</section>;
  }

  const currentMovie = movies[currentIndex];

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
        <a href={`/movie-profile/${currentMovie.id}`}>Read More →</a>

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


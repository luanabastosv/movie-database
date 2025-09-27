import { HashRouter, Routes, Route } from "react-router-dom";
import PageHome from "../routes/PageHome";
import PageMovieProfile from "../routes/PageMovieProfile";
import PageFavs from "../routes/PageFavs";
import PageAbout from "../routes/PageAbout";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import FavsProvider from "../context/FavsContext";
import { LastMovieProvider } from "../context/LastMovieContext";
import { HeroProvider } from "../context/HeroContext";
import ScrollToTop from "../components/ScrollToTop";

function AppRouter() {
  return (
    <HashRouter>
      <HeroProvider>
        <LastMovieProvider>
          <FavsProvider>
            <div className="wrapper">
              <Nav />
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<PageHome />} />
                <Route path="/movie-profile/:id" element={<PageMovieProfile />}/>
                <Route path="/favs" element={<PageFavs />} />
                <Route path="/about" element={<PageAbout />} />
              </Routes>
              <Footer />
            </div>
          </FavsProvider>
        </LastMovieProvider>
      </HeroProvider>
    </HashRouter>
  );
}

export default AppRouter;

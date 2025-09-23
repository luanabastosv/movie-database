import { createContext, useContext, useState } from "react";

const HeroContext = createContext();

export function HeroProvider({ children }) {
  const [heroMovieId, setHeroMovieId] = useState(null);

  return (
    <HeroContext.Provider value={{ heroMovieId, setHeroMovieId }}>
      {children}
    </HeroContext.Provider>
  );
}

export const useHero = () => useContext(HeroContext);

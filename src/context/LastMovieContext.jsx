import { createContext, useState, useContext } from "react";

const LastMovieContext = createContext();

export function LastMovieProvider({ children }) {
  const [lastMovieId, setLastMovieId] = useState(null);

  return (
    <LastMovieContext.Provider value={{ lastMovieId, setLastMovieId }}>
      {children}
    </LastMovieContext.Provider>
  );
}

export const useLastMovie = () => useContext(LastMovieContext);
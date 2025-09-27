import { createContext, useContext, useEffect, useReducer } from "react";
import { appStorageName } from "../globals/globalVariables";

function getFavsFromLocalStorage() {
  const favs = localStorage.getItem(appStorageName);

  if (favs !== null) {
    return {
      items: JSON.parse(favs),
    };
  }

  return {
    items: [],
  };
}

const favsFromStorage = getFavsFromLocalStorage();

// INITIAL STATE
const initialState = {
  items: favsFromStorage.items,
};

function getIndex(item, arr) {
  return arr.findIndex((arrItem) => arrItem.id == item.id);
}

function favsReducer(state, action) {
  switch (action.type) {
    case "ADD_FAV":
      // ADDING TO LOCAL STORAGE
      const newFavs = [...state.items, action.payload];
      localStorage.setItem(appStorageName, JSON.stringify(newFavs));

      return {
        ...state,
        items: newFavs,
      };
    case "DELETE_FAV":
      const itemsCopy = [...state.items];
      const indexToRemove = getIndex(action.payload, state.items);
      itemsCopy.splice(indexToRemove, 1);
      localStorage.setItem(appStorageName, JSON.stringify(itemsCopy));

      // REMOVING FROM LOCAL STORAGE

      return {
        ...state,
        items: [...itemsCopy],
      };
    default:
      return state;
  }
}

export const FavsContext = createContext(initialState);

function FavsProvider({ children }) {
  const [state, dispatch] = useReducer(favsReducer, initialState);

  const addFav = (movieOb) => {
    console.log({ movieOb });
    dispatch({
      type: "ADD_FAV",
      payload: movieOb,
      rating: movieOb.rating || 0,
    });
  };

  const deleteFav = (movieOb) => {
    console.log("delete");
    dispatch({
      type: "DELETE_FAV",
      payload: movieOb,
    });
  };

  const value = {
    favs: state.items,
    addFav,
    deleteFav,
  };

  return <FavsContext.Provider value={value}>{children}</FavsContext.Provider>;
}

export default FavsProvider;

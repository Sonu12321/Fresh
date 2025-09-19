import React, { createContext, useContext, useReducer } from "react";
import useLocalStorage from "../CustomHook/useLocalStorage";



const FavoritesContext = createContext();

const ACTIONS = {
  INIT: "INIT",
  ADD: "ADD",
  REMOVE: "REMOVE"
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.INIT:
      return action.payload || {};
    case ACTIONS.ADD: {
      const { key, book } = action.payload;
      return { ...state, [key]: book };
    }
    case ACTIONS.REMOVE: {
      const { key } = action.payload;
      const next = { ...state };
      delete next[key];
      return next;
    }
    default:
      return state;
  }
}

export function FavoritesProvider({ children }) {
  const [stored, setStored] = useLocalStorage("favorites", {});
  const [state, dispatch] = useReducer(reducer, stored);

  
  React.useEffect(() => {
    setStored(state);
  }, [state, setStored]);

  const addFavorite = (key, book) => dispatch({ type: ACTIONS.ADD, payload: { key, book } });
  const removeFavorite = (key) => dispatch({ type: ACTIONS.REMOVE, payload: { key } });
  const isFavorited = (key) => Boolean(state[key]);

  return (
    <FavoritesContext.Provider value={{ favorites: state, addFavorite, removeFavorite, isFavorited }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}

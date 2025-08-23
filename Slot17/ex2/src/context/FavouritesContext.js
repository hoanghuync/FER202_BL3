import React, { createContext, useContext, useReducer } from "react";

const FavouritesContext = createContext();
export const useFavourites = () => useContext(FavouritesContext);

function favouritesReducer(state, action) {
  switch (action.type) {
    case "ADD_FAVOURITE":
      if (state.find(item => item.id === action.payload.id)) return state;
      return [...state, action.payload];
    case "REMOVE_FAVOURITE":
      return state.filter(item => item.id !== action.payload);
    default:
      return state;
  }
}

export const FavouritesProvider = ({ children }) => {
  const [favourites, dispatch] = useReducer(favouritesReducer, []);
  return (
    <FavouritesContext.Provider value={{ favourites, dispatch }}>
      {children}
    </FavouritesContext.Provider>
  );
};

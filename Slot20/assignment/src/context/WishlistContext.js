import React, { createContext, useReducer, useContext } from 'react';

const WishlistContext = createContext();

const initialState = {
  items: [],
};

function wishlistReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE':
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function WishlistProvider({ children }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  const addToWishlist = (item) => dispatch({ type: 'ADD', payload: item });
  const removeFromWishlist = (id) => dispatch({ type: 'REMOVE', payload: id });
  const clearWishlist = () => dispatch({ type: 'CLEAR' });

  return (
    <WishlistContext.Provider value={{ items: state.items, addToWishlist, removeFromWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);

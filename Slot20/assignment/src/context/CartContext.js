import React, { createContext, useReducer, useContext } from 'react';

const CartContext = createContext();

const initialState = {
  items: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };
    case 'INC':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    case 'DEC':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        ),
      };
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (item) => dispatch({ type: 'ADD', payload: item });
  const removeFromCart = (id) => dispatch({ type: 'REMOVE', payload: id });
  const incQty = (id) => dispatch({ type: 'INC', payload: id });
  const decQty = (id) => dispatch({ type: 'DEC', payload: id });
  const clearCart = () => dispatch({ type: 'CLEAR' });

  const count = state.items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = state.items.reduce((acc, item) => acc + item.quantity * parseInt(item.currentPrice.replace(/\D/g, '')), 0);

  return (
    <CartContext.Provider value={{ items: state.items, count, subtotal, addToCart, removeFromCart, incQty, decQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

import { useState } from 'react';

export function useCartAndFavourite() {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const [favourites, setFavourites] = useState(() => JSON.parse(localStorage.getItem('favourites')) || []);

  const addToCart = (product) => {
    if (!cart.find(item => item.id === product.id)) {
      const updated = [...cart, product];
      setCart(updated);
      localStorage.setItem('cart', JSON.stringify(updated));
    }
  };

  const addToFavourite = (product) => {
    if (!favourites.find(item => item.id === product.id)) {
      const updated = [...favourites, product];
      setFavourites(updated);
      localStorage.setItem('favourites', JSON.stringify(updated));
    }
  };

  const removeFromFavourite = (productId) => {
    const updated = favourites.filter(item => item.id !== productId);
    setFavourites(updated);
    localStorage.setItem('favourites', JSON.stringify(updated));
  };

  const removeFromCart = (productId) => {
    const updated = cart.filter(item => item.id !== productId);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.setItem('cart', JSON.stringify([]));
  };

  return { cart, favourites, addToCart, addToFavourite, removeFromFavourite, removeFromCart, clearCart };
}

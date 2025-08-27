import { Route, Routes } from 'react-router-dom';

import ProduductsPage from '../components/ProductsPage';
import CartPage from '../components/CartPage';
import FavouritePage from '../components/FavouritePage';

export default function AppRoutes() {

return <Routes>
  <Route path="/products" element={<ProduductsPage />} />
  <Route path="/cart" element={<CartPage />} />
  <Route path="/favourites" element={<FavouritePage />} />
</Routes>;

}
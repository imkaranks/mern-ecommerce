import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Products from './pages/Products';
import Search from './pages/Search';
import UserAuth from './pages/UserAuth';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='product/:id' element={<ProductDetails />} />
        <Route path='products' element={<Products />} />
        <Route path='products/:keyword' element={<Products />} />
        <Route path='search' element={<Search />} />
        <Route path='auth' element={<UserAuth />} />
      </Route>
    </Routes>
  );
}

export default App;
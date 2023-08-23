import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import Layout from './components/Layout';
import ProductDetails from './pages/ProductDetails';
import Products from './pages/Products';
import Search from './pages/Search';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='product/:id' element={<ProductDetails />} />
        <Route path='products' element={<Products />} />
        <Route path='products/:keyword' element={<Products />} />
        <Route path='search' element={<Search />} />
      </Route>
    </Routes>
  );
}

export default App;
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import Layout from './components/Layout';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='product/:id' element={<ProductDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
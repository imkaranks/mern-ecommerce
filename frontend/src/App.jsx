import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Products from './pages/Products';
import Search from './pages/Search';
import UserAuth from './pages/UserAuth';
import Profile from './pages/Profile';
import UpdateProfile from './pages/UpdateProfile';
import UpdatePassword from './pages/UpdatePassword';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Cart from './pages/Cart';
import store from './app/store';
import { loadUser } from './actions/userAction';
import './App.css';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='product/:id' element={<ProductDetails />} />
        <Route path='products' element={<Products />} />
        <Route path='products/:keyword' element={<Products />} />
        <Route path='search' element={<Search />} />
        <Route path='auth' element={<UserAuth />} />
        <Route path='cart' element={<Cart />} />
        <Route
          path='account'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='me/update'
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path='password/update'
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='password/forgot'
          element={<ForgotPassword />}
        />
        <Route
          path='password/reset/:token'
          element={<ResetPassword />}
        />
        {/*
        <Route path='orders' element={<Orders />} />
        <Route path='dashboard' element={<Dashboard />} />
        */}
      </Route>
    </Routes>
  );
}

export default App;
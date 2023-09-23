import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
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
import Shipping from './pages/Shipping';
import ConfirmOrder from './pages/ConfirmOrder';
import Payment from './pages/Payment';
import OrderSuccess from './pages/OrderSuccess';
import MyOrders from './pages/MyOrders';
import OrderDetails from './pages/OrderDetails';
import store from './app/store';
import { loadUser } from './actions/userAction';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

function App() {
  const [stripeApiKey, setStripeApiKey] = useState('');

  const fetchStripeApiKey = async () => {
    try {
      const { data } = await axios.get('/api/v1/payment/stripeapikey');
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  useEffect(() => {
    store.dispatch(loadUser());

    fetchStripeApiKey();
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
        <Route path='success' element={<OrderSuccess />} />
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
        <Route
          path='shipping'
          element={
            <ProtectedRoute>
              <Shipping />
            </ProtectedRoute>
          }
        />
        <Route
          path='payment/process'
          element={
            stripeApiKey && (
              <ProtectedRoute>
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              </ProtectedRoute>
            )
          }
        />
        <Route
          path='orders'
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='order/confirm'
          element={
            <ProtectedRoute>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path='order/:id'
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
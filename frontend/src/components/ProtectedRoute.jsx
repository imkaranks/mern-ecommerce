import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

function ProtectedRoute({ children }) {
  const { loading, isAuthenticated } = useSelector(
    state => state.user
  );
  const navigate = useNavigate();

  if (loading === false && isAuthenticated === false) {
    return navigate('/auth');
  }

  return loading ? <Loader /> : children;
}

export default ProtectedRoute;
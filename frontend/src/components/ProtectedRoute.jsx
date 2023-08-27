import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector(
    state => state.user
  );
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return navigate('/auth');
  }

  return children;
}

export default ProtectedRoute;
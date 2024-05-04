import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ currentUser, children }) => {
  console.log('PrivateRoute currentUser:', currentUser);
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;

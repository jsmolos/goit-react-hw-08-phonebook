import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../redux/hooks/useAuth';


export const PrivateRoute = ({ component: Components, redirectTo = '/' }) => {
  const { isLoggedIn } = useAuth();
  const shouldRedirect = !isLoggedIn;

  return shouldRedirect ? <Navigate to={redirectTo} /> : <Components />;
};

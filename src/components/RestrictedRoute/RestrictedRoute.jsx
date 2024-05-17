import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../redux/hooks/useAuth';


export const RestrictedRoute = ({ component: Components, redirectTo = '/' }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Navigate to={redirectTo} /> : <Components />;
};

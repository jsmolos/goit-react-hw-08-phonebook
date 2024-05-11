import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SharedLayout } from 'pages/SharedLayout';
import { RegisterPage } from 'pages/RegisterPage';
import { LoginPage } from 'pages/LoginPage';
import { ContactsPage } from 'pages/ContactsPage';
import { RestrictedRoute } from './RestrictedRoute/RestrictedRoute';
import { PrivateRoute } from './PrivateRoute/PrivateRoute';
import { useDispatch } from 'react-redux';
import { useAuth } from '../redux/hooks/useAuth';
import { refreshUser } from '../redux/auth/authOperations';
import { HomePage } from 'pages/HomePage';

export const App = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, isRefreshing } = useAuth();

  useEffect(() => {
    if (!isLoggedIn && !isRefreshing) {
      dispatch(refreshUser());
    }
  }, [dispatch, isLoggedIn, isRefreshing]);

  if (isRefreshing) {
    return <h1>Refreshing user... Please wait...</h1>;
  }

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="/register"
          element={<RestrictedRoute component={RegisterPage} redirectTo="/contacts" />}
        />
        <Route
          path="/login"
          element={<RestrictedRoute component={LoginPage} redirectTo="/contacts" />}
        />
        <Route
          path="/contacts"
          element={<PrivateRoute component={ContactsPage} redirectTo="/login" />}
        />
        <Route
          path="/logout"
          element={<PrivateRoute component={HomePage} redirectTo="/" />}
        />
      </Route>
    </Routes>
  );
};

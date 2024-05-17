import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from 'components/Navigation/Navigation';

export const SharedLayout = () => {
  return (
    <div style={{ padding: '40px' }}>
      <Navigation />
      <Outlet />
    </div>
  );
};

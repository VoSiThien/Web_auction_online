import { lazy } from 'react';
// import UserManager from '../pages/auth/Admin/UserManager/UserManager';
// import { Role } from './role';

// const ProductDetail = lazy(() => import('../pages/ProductDetail'));
const HomePage = lazy(() => import('../pages/HomePage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const ProfilePage = lazy(() => import('../pages/users/Profile'));

export const routes = [
  {
    path: '/',
    protected: false,
    exact: true,
    component: HomePage,
    // roles: [Role.User],
  },
  {
    path: '/login',
    protected: false,
    exact: true,
    component: LoginPage,
  },
  // {
  //   path: '/profile/:slug',
  //   protected: true,
  //   exact: true,
  //   component: ProfilePage,
  // },
  {
    path: '/profile',
    protected: true,
    exact: true,
    component: ProfilePage,
  },
];

export const adminRoutes = [
];

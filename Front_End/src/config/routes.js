import { lazy } from 'react';
// import UserManager from '../pages/auth/Admin/UserManager/UserManager';
import { Role } from './role';
// const ProductDetail = lazy(() => import('../pages/ProductDetail'));
const HomePage = lazy(() => import('../pages/HomePage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const ProfilePage = lazy(() => import('../pages/users/Profile'));
const ProductPage = lazy(() => import('../pages/users/product-mgt/Product'));
// const AdminLoginPage = lazy(() => import('../pages/admin/LoginPage'));
const DashbroadPage = lazy(() => import('../pages/admin/DashbroadPage'));
const HistoryBidBidder = lazy(() => import('../pages/users/bidder/HistoryBid'));
const HistoryBidSeller = lazy(() => import('../pages/users/seller/HistoryBid'));

export const routes = [
  {
    path: '/',
    protected: false,
    exact: true,
    component: HomePage,
  },
  {
    path: '/login',
    protected: false,
    exact: true,
    component: LoginPage,
  },
  {
    path: '/profile',
    protected: true,
    exact: true,
    component: ProfilePage,
    roles: [Role.Bidder, Role.Seller],
  },
  {
    path: '/product-mgt',
    protected: true,
    exact: true,
    component: ProductPage,
    roles: [Role.Seller],
  },
  {
    path: '/seller/history-bid',
    protected: false,
    exact: true,
    component: HistoryBidSeller,
    roles: [ Role.Seller],
  },
  {
    path: '/bidder/History-bid',
    protected: false,
    exact: true,
    component: HistoryBidBidder,
    roles: [Role.Bidder],
  },
];

export const adminRoutes = [
  // {
  //   path: '/admin/login',
  //   protected: false,
  //   exact: true,
  //   component: AdminLoginPage,
  // },  
  {
    path: '/admin',
    protected: true,
    exact: true,
    component: DashbroadPage,
    roles: [Role.Admin],
  },
  // {
  //   path: '/admin/dashboard',
  //   protected: true,
  //   exact: true,
  //   component: DashbroadPage,
  //   roles: [Role.Admin],
  // },
];

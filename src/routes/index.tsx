import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import ClientDashboard from '../pages/client/Dashboard';
import AccountantDashboard from '../pages/accountant/Dashboard';
import ProjectDetails from '../pages/projects/ProjectDetails';
import AccountantProfile from '../pages/accountant/Profile';
import Messages from '../pages/messages/Messages';
import { AuthGuard } from '../components/auth/AuthGuard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'client',
        element: <AuthGuard />,
        children: [
          { path: 'dashboard', element: <ClientDashboard /> },
          { path: 'projects/:id', element: <ProjectDetails /> },
          { path: 'messages', element: <Messages /> },
        ],
      },
      {
        path: 'accountant',
        element: <AuthGuard />,
        children: [
          { path: 'dashboard', element: <AccountantDashboard /> },
          { path: 'profile', element: <AccountantProfile /> },
          { path: 'messages', element: <Messages /> },
        ],
      },
    ],
  },
]);
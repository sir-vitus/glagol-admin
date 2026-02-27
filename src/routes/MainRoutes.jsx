import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const DashboardShowsAvailability = Loadable(lazy(() => import('views/dashboard/shows-availability')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));

// users routing
const Users = Loadable(lazy(() => import('views/users')));

// shows routing
const Shows = Loadable(lazy(() => import('views/shows')));
const ShowDetails = Loadable(lazy(() => import('views/shows/ShowDetails')));


// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <AuthGuard><Shows /></AuthGuard>
    },
    {
      path: 'dashboard',
      children: [
        {
          element: <DashboardDefault />,
          path: 'default',
        },
        {
          element: <DashboardShowsAvailability />,
          path: 'shows-availability',
        }
      ]
    },
    {
      path: 'typography',
      element: <UtilsTypography />
    },
    {
      path: 'users',
      element: <Users />
    },
    {
      path: 'shows',
      element: <AuthGuard><Shows /></AuthGuard>
    },
    {
      path: '/show-details/:id',
      element: <ShowDetails />
    },
    {
      path: 'color',
      element: <AuthGuard><UtilsColor /></AuthGuard>
    },
    {
      path: 'shadow',
      element: <UtilsShadow />
    },
    {
      path: '/sample-page',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;

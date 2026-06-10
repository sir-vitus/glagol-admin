import { createBrowserRouter, createHashRouter } from 'react-router-dom';

// routes
import AuthenticationRoutes from './AuthenticationRoutes';
import MainRoutes from './MainRoutes';

// ==============================|| ROUTING RENDER ||============================== //

//const router = createBrowserRouter([MainRoutes, AuthenticationRoutes], {
const router = createHashRouter([MainRoutes, AuthenticationRoutes], {
  //basename: import.meta.env.VITE_APP_BASE_NAME.slice(0, -1)
});
console.log('router base:' + router.basename)
export default router;

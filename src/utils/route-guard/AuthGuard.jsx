// Example AuthGuard.js component structure
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from 'hooks/useAuth'; // Custom hook

// Guard Component
const AuthGuard = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};

export default AuthGuard;

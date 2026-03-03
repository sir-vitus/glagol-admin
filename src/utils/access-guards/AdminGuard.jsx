// Example AuthGuard.js component structure
import PropTypes from 'prop-types';
import useAuth from 'hooks/useAuth'; // Custom hook

// assets
import noManagerImage from 'assets/images/no-manager-small.png';

// Guard Component
const AdminGuard = ({ children }) => {
  const { isLoggedIn, authUser } = useAuth();


  if (isLoggedIn && authUser.roles.includes('Admins')) {
    return children;
  }

  return null;
};

AdminGuard.propTypes = {
  children: PropTypes.node,
  showId: PropTypes.number
};

export default AdminGuard;

// Example AuthGuard.js component structure
import PropTypes from 'prop-types';
import useAuth from 'hooks/useAuth'; // Custom hook

// assets
import noManagerImage from 'assets/images/no-manager-small.png';

// Guard Component
const ManagerGuard = ({ children, showId }) => {
  const { isLoggedIn, authUser } = useAuth();

  if(showId) {
    if(isLoggedIn) {
      //console.log ('myShows: ' + authUser.myShows)
      if(authUser.roles.includes('Admins')) return children;
      if(authUser.roles.includes('ShowManagers') && authUser.myShows && authUser.myShows.includes(showId)) return children;
    }
    return null;
  }

  if (isLoggedIn && ['ShowManagers', 'Admins'].every(role => !authUser.roles.includes(role))) {
    return <img src={noManagerImage} />;
  }

  return children;
};

ManagerGuard.propTypes = {
  children: PropTypes.node,
  showId: PropTypes.number
};

export default ManagerGuard;


import { useLocalStorage } from 'hooks/useLocalStorage';
export default function useAuth() {
  const { state, setState, setField, resetState } = useLocalStorage('isAuthenticated', false);
  const isLoggedIn = state ? state.isLoggedIn : false;
  const authUser = state ? state.user : null

  const setAuth = (user) => {
    setField('user', user)
    setField('isLoggedIn', true)
  }
  const logOut = (user) => {
    setField('user', null)
    setField('isLoggedIn', false)
  }
  return { isLoggedIn, authUser, setAuth, logOut };
}
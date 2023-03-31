import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isLoggedSelector } from '../../store/user/userSelector';

const RequireAuth = () => {
  const location = useLocation();
  const isLogged = useSelector(isLoggedSelector);

  return isLogged ? (
    <Outlet />
  ) : (
    <Navigate
      to="/requireAuth"
      state={{ from: location.pathname }}
      replace={true}
    />
  );
};
export default RequireAuth;

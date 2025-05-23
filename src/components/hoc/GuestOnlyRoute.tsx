import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../middlewares/auth';

const GuestOnlyRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated() ? <Navigate to="/my-account" /> : children;
};

export default GuestOnlyRoute;

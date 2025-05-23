import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../middlewares/auth';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

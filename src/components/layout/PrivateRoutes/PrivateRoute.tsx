import type { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRoute {
  children: ReactElement;
}

const PrivateRoute: FC<PrivateRoute> = ({ children }) => {
  const token = true;

  return token != null ? children : <Navigate to="/" />;
};

export default PrivateRoute;

import { useContext } from "react";
import { AuthContext } from "../../modules/auth";
import { Navigate } from 'react-router-dom';

interface PublicRoutesProps {
  children: JSX.Element;
}

export const PublicRoutes = ({children}: PublicRoutesProps): JSX.Element => {
  const {authState} = useContext(AuthContext);
  const {logged} = authState;
  return logged 
    ? 
      <Navigate to='/dashboard/heroes/marvel'/> 
    : 
      children;
}

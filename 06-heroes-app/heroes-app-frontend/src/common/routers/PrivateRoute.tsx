import { useContext, useEffect } from "react"
import { AuthContext } from "../../modules/auth";
import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
}

export const PrivateRoute = ({children}: PrivateRouteProps): JSX.Element => {
  const {pathname, search} = useLocation();

  useEffect(() => {
    const lastPath: string = pathname + search;
    localStorage.setItem('lastPath', lastPath);
    console.log('No es la misma url por eso se renderiza de nuevo');
  }, [pathname, search]);

  const {authState} = useContext(AuthContext);
  const {logged} = authState;
  return (logged) 
    ? 
      children 
    : 
      <Navigate to={'/auth/login'}/>;
}

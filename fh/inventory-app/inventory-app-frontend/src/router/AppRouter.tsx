import { useEffect } from "react";
import { Navigate, Route, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Routes } from "react-router";
import { AuthRoutes, AuthStatus } from "../modules/auth";
import { UserRoutes } from "../modules/users";
import { AppDispatch, RootState, startRefreshToken } from "../store";
import { Spinner } from "../modules/core";
import { ProductRoutes } from "../modules/products/routes/ProductRoutes";

export const AppRouter = (): JSX.Element => {

  const { authStatus } = useSelector((rootState: RootState) => rootState.authSlice);
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  useEffect(() => {
    dispatch(startRefreshToken());
  }, [dispatch, location]);

  if (authStatus === AuthStatus.CHECKING) return (<Spinner />)

  return (
    <Routes>
      <>
        {
          (authStatus === AuthStatus.NOT_AUTHENTICATED)
            ?
              <>
                <Route path="auth/*" element={<AuthRoutes />} />
                <Route path="/*" element={<Navigate to={'/auth/sign-in'} />} />
              </>
            :
              <>
                <Route path="users/*" element={<UserRoutes /> } />
                <Route path="products/*" element={<ProductRoutes /> } />
                <Route path="/*" element={<Navigate to={'/users/list'} />} />
              </>
        }
      </>
    </Routes>
  )
}

/*
  Tecnologias de big data: Apache Spark, Haddop
  Sql
  Lenguajes de programacion: Python
  Cloud: AWS
  ETL
*/

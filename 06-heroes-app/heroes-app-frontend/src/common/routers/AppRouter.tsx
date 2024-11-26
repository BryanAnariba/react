import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../../modules/auth";
import { HeroesRoutes } from "../../modules/heroes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoutes } from "./PublicRoutes";

export const AppRouter = () => {
  return (
    <>

      <Routes>

        <Route
          path="/auth/*"
          element={
            <PublicRoutes>
              <AuthRoutes />
            </PublicRoutes>
          }
        />

        <Route 
          path="/dashboard/heroes/*"  
          element={
            <PrivateRoute>
              <HeroesRoutes/>
            </PrivateRoute>
          }
        />

        <Route path="/" element={<Navigate to={'/auth/login'}/>} />

      </Routes>
    </>
  )
}

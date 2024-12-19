import { Navigate, Route } from "react-router";
import { Routes } from "react-router";
import { AuthRoutes } from "../modules/auth";
import { UserRoutes } from "../modules/users";

export const AppRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route path="auth/*" element={<AuthRoutes />} />
      <Route path="users/*" element={<UserRoutes /> } />
      <Route path="*" element={<Navigate to={'/auth/sign-in'}/>} />
    </Routes>
  )
}

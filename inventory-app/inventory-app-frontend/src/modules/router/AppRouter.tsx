import { Navigate, Route, Routes } from "react-router";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { InventoryRoutes } from "../landing";

export const AppRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route path='auth/*' element={<AuthRoutes />} />
      <Route path='inventory/*' element={<InventoryRoutes />} />
      <Route path='*' element={<Navigate to={'/auth/sign-in'} />} />
    </Routes>
  )
}

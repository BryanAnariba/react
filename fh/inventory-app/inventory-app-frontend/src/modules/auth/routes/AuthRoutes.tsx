import { Navigate, Route, Routes } from "react-router"
import { AuthLayoutPage } from "../pages/AuthLayoutPage"
import { SignInPage } from "../pages/SignInPage"
import { SignUpPage } from "../pages/SignUpPage"

export const AuthRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route element={<AuthLayoutPage />}>
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route path="*" element={<Navigate to={'/auth/sign-in'}/>} />
      </Route>
    </Routes>
  )
}

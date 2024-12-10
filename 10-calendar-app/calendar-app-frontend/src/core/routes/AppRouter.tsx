import { Route, Routes } from "react-router";
import { AuthStatus, LoginPage } from "../../modules/auth";
import { CalendarPage } from "../../modules/calendar";
import { Navigate } from "react-router";

export const AppRouter = (): JSX.Element => {
  const authStatus = AuthStatus.AUTHENTICATED;

  return (
    <Routes>
      {
        (authStatus === AuthStatus.NOT_AUTHENTICATED)
          ?
            <Route path="/auth/*" element={<LoginPage />} />
          :
            <Route path="/*" element={<CalendarPage />} />
      }

      <Route path="/*" element={<Navigate to={'/auth/login'} />} />
      <Route />
    </Routes>
  )
}

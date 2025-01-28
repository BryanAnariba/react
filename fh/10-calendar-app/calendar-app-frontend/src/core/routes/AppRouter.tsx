import { Route, Routes } from "react-router";
import { AuthStatus, LoginPage } from "../../modules/auth";
import { CalendarPage } from "../../modules/calendar";
import { Navigate } from "react-router";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";

export const AppRouter = (): JSX.Element => {

  const { startCheckAuthToken, status } = useAuthStore();

  useEffect(() => {
    startCheckAuthToken();    
  }, []);
  
  if (status === AuthStatus.CHECKING) return (<h3>Loading...</h3>);
  
  return (
    <Routes>
      {
        (status === AuthStatus.NOT_AUTHENTICATED)
          ?
            <>
              <Route path="/auth/*" element={<LoginPage />} />
              <Route path="/*" element={<Navigate to={'/auth/login'} />} />
            </>
          :
            <>
              <Route path="/dashboard/calendar" element={<CalendarPage />} />
              <Route path="/*" element={<Navigate to={'/dashboard/calendar'} />} />
            </>
      }

      <Route />
    </Routes>
  )
}

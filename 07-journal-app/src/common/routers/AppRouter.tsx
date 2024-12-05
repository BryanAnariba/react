import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../../features/auth";
import { JournalRoutes } from "../../features/journal";

import { CheckingAuth } from "../../features/ui";
import { useCheckAuth } from "../hooks";
import { AuthStatus } from "../../store/auth";

export const AppRouter = (): JSX.Element => {
  const { status } = useCheckAuth();
  if (status === AuthStatus.CHECKING) return (<CheckingAuth />);

  return (
    <Routes>
      {
        (status === AuthStatus.AUTHENTICATED)
          ?
          <Route path="/*" element={<JournalRoutes />} />
          :
          <Route path="/auth/*" element={<AuthRoutes />} />
      }
      <Route path="/*" element={<Navigate to={'/auth/login'} />} />
    </Routes>
  );
};

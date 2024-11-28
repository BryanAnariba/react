import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../../features/auth";
import { JournalRoutes } from "../../features/journal";

export const AppRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/*" element={<JournalRoutes />} />
    </Routes>
  );
};

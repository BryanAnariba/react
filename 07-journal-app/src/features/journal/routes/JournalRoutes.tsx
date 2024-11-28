import { Navigate, Route, Routes } from "react-router-dom";
import { JournalPage } from "../pages";
export const JournalRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<JournalPage />} />
      <Route path="/*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};

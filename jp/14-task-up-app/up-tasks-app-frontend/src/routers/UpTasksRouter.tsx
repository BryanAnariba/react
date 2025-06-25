import { BrowserRouter, Route, Routes } from "react-router";
import DashboardView from "../modules/common/views/DashboardView";
import CreateProyectView from "../modules/projects/views/CreateProyectView";
import UpTaskLayout from "../modules/common/layouts/UpTaskLayout";

export default function UpTasksRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UpTaskLayout />}>
          <Route path="/" index element={<DashboardView />} />
          <Route path="/projects/create" index element={<CreateProyectView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

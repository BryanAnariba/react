import { BrowserRouter, Routes, Route } from "react-router";
import UpTaskAppLayout from "./layouts/UpTaskAppLayout";
import DashboardPage from "./pages/DashboardPage";
import CreateProjectPage from "./modules/projects/pages/CreateProjectPage";
import EditProjectPage from "./modules/projects/pages/EditProjectPage";
import ProjectDetailsPage from "./modules/projects/pages/ProjectDetailsPage";

export default function UpTaskRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UpTaskAppLayout />}>
          <Route index path="/" element={<DashboardPage />} />
          <Route path="/projects/create" element={<CreateProjectPage />} />
          <Route path="/projects/:projectId/edit" element={<EditProjectPage />}/>
          <Route path="/projects/:projectId/details" element={<ProjectDetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

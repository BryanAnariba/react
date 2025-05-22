import { BrowserRouter, Routes, Route } from "react-router";
import UpTaskAppLayout from "./layouts/UpTaskAppLayout";
import DashboardPage from "./pages/DashboardPage";
import CreateProjectPage from "./modules/projects/pages/CreateProjectPage";
import EditProjectPage from "./modules/projects/pages/EditProjectPage";
import ProjectDetailsPage from "./modules/projects/pages/ProjectDetailsPage";
import AuthLayout from "./layouts/AuthLayout";
import SignInPage from "./modules/auth/pages/SignInPage";
import NewAccountPage from "./modules/auth/pages/NewAccountPage";
import ConfirmAccountPage from "./modules/auth/pages/ConfirmAccountPage";
import ResendNewCodePage from "./modules/auth/pages/ResendNewCodePage";
import ForgotPasswordPage from "./modules/auth/pages/ForgotPasswordPage";
import NewPasswordTokenPage from "./modules/auth/pages/NewPasswordTokenPage";

export default function UpTaskRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UpTaskAppLayout />}>
          <Route index path="/" element={<DashboardPage />} />
          <Route path="/projects/create" element={<CreateProjectPage />} />
          <Route
            path="/projects/:projectId/edit"
            element={<EditProjectPage />}
          />
          <Route
            path="/projects/:projectId/details"
            element={<ProjectDetailsPage />}
          />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/auth/sign-in" element={<SignInPage />} />
          <Route path="/auth/new-account" element={<NewAccountPage />} />
          <Route
            path="/auth/confirm-account/:userId"
            element={<ConfirmAccountPage />}
          />
          <Route path="/auth/resend-code" element={<ResendNewCodePage />} />
          <Route
            path="/auth/forgot-password"
            element={<ForgotPasswordPage />}
          />
          <Route path="/auth/new-password/:userId" element={<NewPasswordTokenPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

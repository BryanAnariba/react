import { Navigate, Route, Routes } from "react-router-dom";
import { AboutPage, HomePage, LoginPage } from "./pages";
import { Navbar } from "./components";
import { UserProvider } from "./context/UserProvider";

export const MainApp = (): JSX.Element => {
  return (
    <UserProvider>
      <Navbar />
      <hr />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/*" element={<Navigate to={'/'} />} />
        <Route />
      </Routes>
    </UserProvider>
  )
}


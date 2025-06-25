import { Navigate, Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Header from "../shared/components/Header";
import Footer from "../shared/components/Footer";

import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../shared/hooks/useAuth";
import Loading from "../shared/components/Loading";

export default function UpTaskAppLayout() {
  const { data, isError, isLoading } = useAuth();

  if (isLoading) return <Loading />;

  if (isError) return <Navigate to="/auth/sign-in" />;
  
  if (data)
    return (
      <>
        <Header data={data} />

        <section className="max-w-screen-2xl mx-auto mt-10 p-5">
          <Outlet />
        </section>

        <Footer />

        <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
      </>
    );
}

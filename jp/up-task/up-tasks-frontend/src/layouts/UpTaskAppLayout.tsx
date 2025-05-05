import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Header from "../shared/components/Header";
import Footer from "../shared/components/Footer";

import "react-toastify/dist/ReactToastify.css";

export default function UpTaskAppLayout() {
  return (
    <>
      <Header />

      <section className="max-w-screen-2xl mx-auto mt-10 p-5">
        <Outlet />
      </section>

      <Footer />

      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </>
  );
}

import { Outlet } from "react-router";
import Logo from "../shared/components/Logo";
import { ToastContainer } from "react-toastify";

export default function AuthLayout() {
  return (
    <>
      <div className="bg-gray-800 min-h-screen">
        <div className="py-10 lg:py-20 mx-auto w-[450px]">
            <Logo />
            <div className="mt-10">
                <Outlet />
            </div>
        </div>
      </div>
      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </>
  );
}

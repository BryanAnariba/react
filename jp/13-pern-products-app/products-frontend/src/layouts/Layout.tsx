import { Outlet } from "react-router";
import Header from "../components/Header";

export default function Layout() {
  return (
    <>
      <Header />
      
      <main className="mt-10 mx-auto max-w-6xl p-10 bg-white shadow">
        <Outlet />
      </main>
    </>
  );
}

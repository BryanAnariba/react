import { Outlet } from "react-router";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { useCocktailsAppStore } from "../store/useCocktailsAppStore";
import { useEffect } from "react";
import Notification from "../components/Notification";

export default function Layout() {

  const loadFavoritesFromLocalStorage= useCocktailsAppStore((state) => state.loadFavoritesFromLocalStorage);

  useEffect(() => {
    loadFavoritesFromLocalStorage();
  }, []);

  return (
    <>
      <Header />
      <main className="container mx-auto py-16">
        <Outlet />
      </main>
      <Modal />
      <Notification />
    </>
  );
}

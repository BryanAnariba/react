import { useContext, useEffect } from "react";
import { UiContext } from "../store/context/UiContext";

export default function useMenu(hide: boolean) {
  const { showMenu, hideMenu } = useContext(UiContext);

  useEffect(() => {
    if (hide) {
      hideMenu();
    } else {
      showMenu();
    }
  }, [hide, showMenu, hideMenu]);
}

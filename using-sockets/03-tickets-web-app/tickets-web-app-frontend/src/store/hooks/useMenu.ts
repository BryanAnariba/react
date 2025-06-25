import { useContext, useEffect } from "react";
import { MenuUIContext } from "../context/MenuUiContext";

export const useMenu = (hide: boolean) => {
  // Para esta pantalla se oculartaran los Sider y Header
  const { showMenu, hideMenu } = useContext(MenuUIContext);

  useEffect(() => {
    if (hide) {
      hideMenu();
    } else {
      showMenu();
    }
  }, [hide, showMenu, hideMenu]);
};

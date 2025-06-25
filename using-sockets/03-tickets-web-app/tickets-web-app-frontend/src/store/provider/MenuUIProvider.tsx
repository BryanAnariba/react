import { useState } from "react";
import { MenuUIContext } from "../context/MenuUiContext";

export const MenuUIProvider = ({ children }: React.PropsWithChildren) => {
  const [menu, setHideMenu] = useState<boolean>(true);

  const showMenu = () => {
    setHideMenu(false);
  };

  const hideMenu = () => {
    setHideMenu(true);
  };

  return (
    <MenuUIContext.Provider
      value={{
        menu: menu,
        showMenu: showMenu,
        hideMenu: hideMenu,
      }}
    >
      {children}
    </MenuUIContext.Provider>
  );
};

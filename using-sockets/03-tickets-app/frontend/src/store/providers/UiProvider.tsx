import { useState } from "react";
import { UiContext } from "../context/UiContext";

export type UiProviderProps = {
  children: React.ReactNode;
};

export const UiProvider = ({ children }: UiProviderProps) => {
  const [menu, setMenu] = useState<boolean>(true);

  const showMenu = () => {
    setMenu(false);
  };

  const hideMenu = () => {
    setMenu(true);
  };

  return (
    <UiContext.Provider
      value={{
        menu,
        showMenu,
        hideMenu,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
